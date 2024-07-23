const User = require('../models/users');
const transporter = require('../config/nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

exports.register = async (req, res) => {
    console.log('INISDE REGISTERRR');
    const {username, password, email} = req.body;
    const adminRegistrationKey = req.header('x-admin-registration-key');

    if(adminRegistrationKey != process.env.ADMIN_REGISTRATION_KEY) {
        return res.status(403).json({message: 'Invalid registration key'});
    }
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'user already exists'});
        }
        const user = new User({username, password, email});
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1d'});
        user.emailVerificationToken = token;

        await user.save();

        verifyEmail(user);

    } catch(err) {
        res.status(500).json({message: 'Server error'});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        console.log(`USER FOUND ${user}`);

        if(!user) {
            return res.status(404).json({message: 'User not found'});
        } else if (user.resetPasswordToken) {
            return res.status(403).json({message: 'please check your email to verify your account first.'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`IS MATCH ${isMatch}`);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
            );
            console.log(`TOKEN ${token}`);

        res.json({'token': token});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
};

exports.checkSuperAdmin = async(req, res) => {
    try {
        const superAdmin = await User.findOne({role: 'superadmin'});
        if (superAdmin) {
            return res.json({ exists: true });
          } else {
            return res.json({ exists: false });
          }
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
};

exports.createUser = async(req, res) => {
    console.log("CREATE USERRRRR");

    const {name, email} = req.body;
    try {
        const existingUser = await User.findOne({username: name, email: email});
        const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
        const role = existingSuperAdmin ? 'admin' : 'superadmin'

        if (!existingUser) {
            const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '1d'});

            const admin = new User({
                username: name,
                password: 'temp',
                email: email,
                role: role,
                resetPasswordToken: token
            });

            await admin.save();
            mail(admin, res);
        } else if (existingUser.resetPasswordToken) {
            verifyEmail(existingUser);
        }
    } catch(error) {
        res.status(500).json({ message: 'Server error' });
    }

};

exports.setPassword = async(req, res) => {
    const { token, password } = req.body;
    console.log(req.body);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({email: decoded.email, resetPasswordToken: token});
        console.log(`DECODED ${decoded} EMAIL= ${decoded.email}`);
        console.log(`USER UEUEUE ${user.email} ${user.resetPasswordToken}`);
        if(!user) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
        user.password = password;
        user.resetPasswordToken = null;
        console.log('BEFORE SAVINGGGGGGg')
        await user.save();
        res.status(200).json({ message: 'Password set successfully' });
    } catch (error) {
        console.log(`ERROR SETTING PASSWORD ${error}`);
        res.status(500).json({ message: 'Server error' });
      }
};

const mail = async(user, res) => {
    console.log("INSIDE VERIFY MAILl");
    console.log(process.env.EMAIL_USER);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Set Password',
            text: `Click the following link to set your password: ${process.env.FRONTEND_BASE_URL}/set-password?token=${user.resetPasswordToken}`
        };
        console.log(mailOptions);
    
        transporter.sendMail(mailOptions, (err, info) => {
            console.log(`Send mail ${info} ===== ${err}`);
            if (err) {
                console.error(err);
                res.status(500).json({error: 'Error sending verification email'});
              } else {
                res.status(201).json({message: 'User created, please check your email to verify your account'});
              }
        });
}

function verifyEmail(user) {

}


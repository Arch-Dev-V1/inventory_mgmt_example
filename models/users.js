const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, default: 'superadmin'},
    resetPasswordToken: { type: String }    
});

UserSchema.pre('save', async function(next) {
    console.log('INISDE PRE SAVE');
    // if(!this.isModified('password')) {
    //     return next();
    // }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(err) {
        next(err);
    }
});

module.exports = mongoose.model('User', UserSchema);
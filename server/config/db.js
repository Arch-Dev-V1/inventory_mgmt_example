const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const dburi = process.env.MONGODB_URI;
        await mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true }); 
        console.log("Connected");

    } catch(error) {
        console.error(error.message + 'kjahdkfjh');
        process.exit(1);
    }
}
module.exports = connectDB;
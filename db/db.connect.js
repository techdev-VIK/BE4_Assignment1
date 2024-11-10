const mongoose = require('mongoose');

require('dotenv').config();


const mongoUri = process.env.MONGODB;


const initializeDatabase = async() => {
    await mongoose.connect(mongoUri).then(() => {
        console.log('Database Connected');
    }).catch((error) => {
        console.log('Failed to connect', error);
    })
}


module.exports = {initializeDatabase};
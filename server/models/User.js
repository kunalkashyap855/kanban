const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: String,
    password: String,
    taskColumns:[
        {
            name: String,
            items: [String]
        },
        {
            name: String,
            items: [String]
        },
        {
            name: String,
            items: [String]
        },
        {
            name: String,
            items: [String]
        }
    ]
         
    
});

const User = mongoose.model('User',UserSchema);

module.exports = User;
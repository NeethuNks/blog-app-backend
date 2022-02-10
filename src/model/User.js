const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Arjun:Norka123@cluster0.s5tyz.mongodb.net/blog?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },   
    isAdmin:{
        type:Boolean,
        required:true,
        
    },
},
    {timestamps: true}
);

var User = mongoose.model('User',UserSchema);

module.exports = User;
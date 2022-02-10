const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Arjun:Norka123@cluster0.s5tyz.mongodb.net/blog?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:false,
    },
    votes:{
        type:Number,
     },
    comments:{
        type:Array
    },

},
    {timestamps: true}
);

var Article = mongoose.model('Article',ArticleSchema);

module.exports = Article;
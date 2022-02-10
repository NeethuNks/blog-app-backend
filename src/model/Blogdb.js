const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Arjun:Norka123@cluster0.s5tyz.mongodb.net/blog?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var ArticleInfo = mongoose.model('articles',articleSchema);

module.exports = ArticleInfo;
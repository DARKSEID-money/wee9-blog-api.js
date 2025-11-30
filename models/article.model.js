const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        
    },
    content:{
        type: String,
        required: true,
        
    },
    author:{
        type: String,
        default: "Guest"
    }
}, {timestamps: true }
);

articleSchema.index({ title: "text", content: "text"});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength: 5,
        
    },
    content:{
        type: String,
        required: true,
        minLength: 20,
        
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }
}, {timestamps: true }
);

articleSchema.index({ title: "text", content: "text"});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
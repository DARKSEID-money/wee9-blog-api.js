
const Joi = require("joi");

const ArticleModel = require("../models/article.model")

const postArticle = async (req, res, next) => {

    const articleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(20).required(),
        author: Joi.string().optional().default("Guest"),
    });

    const {error ,value} = articleSchema.validate(req.body);

    if(error){
        return res.status(400).json({
             error,
        });
    }
    try {
        const { title, content, author } = value;
        const newArticle = new ArticleModel({
            title,
            content,
            author,
        });
        await newArticle.save();

        return res.status(200).json({
            message: "Article created",
            data: newArticle,
        });
    } catch (error) {
        next(error);
    }
}


const getAllArticle = async (req, res, next) => {
    ;
    try {
        const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page -1) * limit;

    const searchQuery = req.query.q
        
        let articles;
        if (searchQuery) {
            articles = await ArticleModel.find({ $text: { $search: searchQuery } })
            .sort({createdAt: -1})
            .limit(limit)
            .skip(skip);
        } else {
            aritxles = await ArticleModel.find()
            .sort({ createdAt: -1})
            .limit(limit)
            .skip(skip);
        }
       res.status(200).json({
        message: searchQuery ? `Search results for "${searchQuery}"` : "Aritcles fetched",
        data: articles
       })
    } catch (error) {
        console.error(error);
        next(error);
    }
}


const getArticleById = async (req, res, next) => {
    try {
        
        const article = await ArticleModel.findById(req.params.id)

        if(!article){
            return res.status(404).json({
                message: `Article with ID ${req.params.id} not found`
            })
        }

        return res.status(200).json({
            message: 'article found',
            data: article,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
};


const updateArticleById = async (req, res, next) => {

       const articleSchema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(20).optional(),
        author: Joi.string().optional(),  
    });

    const {error, value} = articleSchema.validate(req.body);

       if(error){
        return res.status(400).json('Please provide article title and content')
    }
    try {
        
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
             {...value},
              {
            new: true,
            runValidator: true,
        });

        if(!updatedArticle){
            return res.status(404).json({
                message: "article not foung",
            });
        }

            return res.status(200).json({
                message: "article updated",
                data: updatedArticle
            }); 
    } catch (error) {
        next(error);
    }
};


const deleteArticleById = async (req, res, next) => {
    try {
        
        const article = await ArticleModel.findByIdAndDelete(req.params.id)

        if(!article){
            return res.status(404).json({
                message: 'Article not Found',
            });
        }
        return res.status(200).json({message: "Article Deleted"});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,
};
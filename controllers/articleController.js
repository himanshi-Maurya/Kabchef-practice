const Article = require('../models/articleModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { roles } = require('../roles')


exports.getArticles= async (req,res,next) => {
try{const articles = await Article. find({});
res.status(200).json({
    data: articles 
  });}
  catch(error)
  {
    next(error);
  }
}

exports.getArticle= async(req,res,next) => {
    try {
        const userId = req.params.userId;
        const article = await Article.findById(userId);
        if (!article) return next(new Error('Article does not exist'));
        res.status(200).json({
          data: article
        });
      } catch (error) {
        next(error)
      }
}

exports.postArticle = async (req,res,next) => {
  try  {
       const user = res.locals.loggedInUser;
    const {title, description}= req.body;

    const newArticle = new Article ({title, description ,userId : user});
    await newArticle.save();
    res.json({
        data: newArticle,
        message: "You have created an article successfully"
      })}

      catch (error){
          next(error)
      }

}

exports.updateArticle =async (req,res,next) => {
    try {
        const { title,description  } = req.body
        const userId = req.params.userId;
        await Article .findByIdAndUpdate(userId, {title,description });
        const article = await Article.findById(userId)
        res.status(200).json({
          data: article
        });
      } catch (error) {
        next(error)
      }
}

exports.deleteArticle = async (req,res,next) => {
    try {
        const userId = req.params.userId;
        await Article.findByIdAndDelete(userId);
        res.status(200).json({
          data: null,
          message: 'Article has been deleted'
        });
      } catch (error) {
        next(error)
      }
    
}
const express = require("express");
const router = express();
const Article = require("../model/Article");
const User = require("../model/User");


//Create article
router.post("/", async (req, res) => {
 
  const newArticle = new Article(req.body);

  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update article
router.put("/:id", async (req, res) => {
 
  const article = await Article.findById(req.params.id);

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }

});

//Delete article
router.delete("/:id", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
 
  const article = await Article.findById(req.params.id);
 
  try {
    await article.delete();
    res.status(200).json("Article has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
 
});

//Get single article
router.get("/:id", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all articles
router.get("/api/articles", async (req, res) => {
 
  try {
       const article = await Article.find();
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //Get all articles
// router.get('/api/articles',(req,res) => {
  
//   Article.find()
//   .then ((article)=>{
//       res.json(article)
//   })
// });

module.exports = router;

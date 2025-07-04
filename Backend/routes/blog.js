const {Router} = require("express");
const multer = require("multer")
const path = require("path")
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const {checkForAuthentication} = require("../middleware/auth")
const mongoose = require("mongoose");


const router = Router();

router.get("/",  async (req, res)=> { 
    const allBlogs = await Blog.find({});
    res.json({message: "Page for showing blogs", 
        user: req.user,
        blogs: allBlogs,
    })
})

router.get("/myBlogs", checkForAuthentication(), async (req, res) => {
  const myBlogs = await Blog.find({ createdBy: req.user._id }).populate("createdBy");
  return res.json({ myBlogs });
});


router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    const comments = await Comment.find({
      blogId: new mongoose.Types.ObjectId(req.params.id)
    }).populate("createdBy");

    return res.json({
      message: "Page for reading blogs",
      user: req.user,
      blog,
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
}
)
const upload = multer({ storage: storage })

router.post("/comm/:blogId", checkForAuthentication(), async (req,res)=> {
  const comment = await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id
  })
  return res.json({message: "Comment created"})
})


router.post("/",checkForAuthentication(),upload.single('coverImage'), async (req, res)=> {
  
    const {title, Body}= req.body
    const blog = await Blog.create ({
      Body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`
    })
   
    return res.json({message: "data recieved"});
})

module.exports = router;
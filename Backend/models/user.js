const {Schema,model} = require('mongoose');
const mongoose = require("mongoose");
require('./comment');
require('./blog');


const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: '/images/images.png',
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },

}, {timestamps: true});

userSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    const userId = this._id;

    const Comment = mongoose.model("Comment");
    const Blog = mongoose.model("Blog");

    const deletedComments = await Comment.deleteMany({ createdBy: userId });
    const deletedBlogs = await Blog.deleteMany({ createdBy: userId });

   

    next();
  } catch (err) {
    console.error("Error in User.deleteOne middleware:", err);
    next(err);
  }
});


const User = model("user", userSchema);

module.exports = User;
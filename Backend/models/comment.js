const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog", 
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user", 
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

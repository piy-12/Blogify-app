const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  Body: {
    type: String,
    required: true,
  },
  coverImageURL: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user", 
    required: true,
  },
}, { timestamps: true });


module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

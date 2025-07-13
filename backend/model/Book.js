const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    cover: { type: String },
    isBestseller: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isDeal: { type: Boolean, default: false },
  },
  {
    validate: {
      validator: function () {
        // Require at least one of 'cover' (uploaded) or 'url' (external)
        return !!this.cover;
      },
      message: "A cover image (uploaded or URL) is required.",
    },
  }
);

module.exports = mongoose.model("Book", bookSchema);

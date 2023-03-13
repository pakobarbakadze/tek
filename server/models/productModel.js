import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    name: {
      type: String,
      requre: true,
    },
    image: {
      buffer: Buffer,
      contentType: String,
    },
    brand: {
      type: String,
      requre: true,
    },
    category: {
      type: String,
      requre: true,
    },
    description: {
      type: String,
      requre: true,
    },
    price: {
      type: Number,
      requre: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

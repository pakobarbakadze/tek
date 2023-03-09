import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        requre: true
    },
    images: [{
        type: String,
        requre: true,
    }],
    brand: {
        type: String,
        requre: true
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
        default: 0
    },
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product
import mongoose from "mongoose";

const womensSchema = new mongoose.Schema({
    Gender: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    SubCategory: {
        type: String,
        required: true,
    },
    ProductType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    Colour: {
        type: String,
        required: true,
    },
    Usage: {
        type: String,
        required: true,
    },
    ProductTitle: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    ImageURL: {
        type: String,
        required: true,
    }
});
const WomensProducts = mongoose.model("WomensProducts",womensSchema)
export default WomensProducts;
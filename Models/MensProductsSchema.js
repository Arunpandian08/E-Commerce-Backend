import mongoose from "mongoose";

const mensSchema = new mongoose.Schema({
    Brand: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    id_image: {
        type: String,
        required: true,
    },
    Category_by_gender: {
        type: String,
        required: true,
    },
    Color: {
        type: String,
        required: true,
    },
    DiscountPrice: {
        type: Number,
        required: true,
    },
    OriginalPrice: {
        type: Number,
        required: true,
    }
});

const MensProduct = mongoose.model("MensProduct",mensSchema)
export default MensProduct;
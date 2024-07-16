import mongoose from "mongoose";

const furnitureSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    asin: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: String,
    },
    categories: {
        type: String,
        required: true,
    },
    primary_image: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    upc: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    item_model_number: {
        type: String,
    },
    package_dimensions: {
        type: String,
        required: true,
    },
    date_first_available: {
        type: String,
    },
    country_of_origin: {
        type: String,
    },
    color: {
        type: String,
    },
    material: {
        type: String,
        required: true,
    },
    style: {
        type: String,
    },
    important_information: {
        type: [String],
        required: true,
    },
    product_overview: {
        type: [String],
        required: true,
    },
    about_item: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
    },
    specifications: {
        type: [String],
        required: true,
    },
    uniq_id: {
        type: String,
        required: true,
    },
    scraped_at: {
        type: String,
        required: true,
    }
});

const Furniture = mongoose.model("Furniture", furnitureSchema)
export default Furniture;
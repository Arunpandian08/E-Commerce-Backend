import mongoose from 'mongoose'

const electronicsSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    sub_category: {
        type: String,
        required: true,
    },
    main_category: {
        type: String,
        required: true,
    },
    product_old_price: {
        type: Number,
        required: true,
    },
    product_new_price: {
        type: Number,
        required: true,
    },
    product_rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    product_description: {
        type: String,
        required: true,
    },
})

const Electronics = mongoose.model('Electronics',electronicsSchema)
export default Electronics;
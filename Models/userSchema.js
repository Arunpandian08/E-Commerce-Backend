import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'category'
    },
    category: {
        type: String,
        enum: ['electronics', 'mens', 'womens', 'furniture'],
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
    },
    profileImage: {
        type: String, // Storing URL or file path
    },
    address: {
        addressLine1: String,
        addressLine2: String,
        zipCode: Number,
    },
    products: [productSchema],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

const User = mongoose.model('User', userSchema);
export default User;

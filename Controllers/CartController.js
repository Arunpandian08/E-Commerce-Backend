import mongoose from 'mongoose';
import models from '../Models/models.js';
import User from '../Models/userSchema.js';

// console.log('Loaded models:', models);

export const fetchCartProducts = async (request, response) => {
    try {
        const userId = request.userId;

        // Find the user first
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: 'User Not Found!' });
        }

        // Dynamically populate products based on their category
        const populatedProductsPromises = user.products.map(async (product) => {
            const model = models[product.category];
            if (model) {
                const populatedProduct = await model.findById(product.productId);
                return { ...product.toObject(), productId: populatedProduct };
            }
            return product;
        });

        const populatedProducts = await Promise.all(populatedProductsPromises);

        // Update the user's products with the populated products
        user.products = populatedProducts;

        return response.status(200).json({ message: "Successfully fetched products from user", products: user.products });
    } catch (error) {
        console.error("Failed to fetch cart products from user", error);
        return response.status(500).json({ message: "Internal server error", error: error.message });
    }
};



// Function to add a product to the cart
export const addProductToCart = async (request, response) => {
    const { _id, category } = request.body;

    try {
        const userId = request.userId;
        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({ message: "User Not Found !" });
        }

        const ProductModel = models[category];

        if (!ProductModel) {
            return response.status(400).json({ message: "Invalid category" });
        }

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return response.status(400).json({ message: "Invalid product ID" });
        }

        const product = await ProductModel.findById(_id);
        if (!product) {
            return response.status(404).json({ message: "Product Not Found !" });
        }

        const existingProductIndex = user.products.findIndex(item => item.productId.toString() === _id && item.category === category);

        if (existingProductIndex !== -1) {
            user.products[existingProductIndex].quantity++;
        } else {
            user.products.push({ productId: _id, category, quantity: 1 });
        }

        await user.save();

        // Populate product details after save
        const populatedUser = await User.findById(userId).populate({
            path: 'products.productId',
            model: models[category] // Dynamically select the model based on category
        });

        // console.log('Populated User Products:', populatedUser.products);
        response.status(200).json({ message: "Product Added Successfully", products: populatedUser.products });
    } catch (error) {
        console.error("Failed to add product to cart", error);
        response.status(500).json({ message: "Failed to add product to cart", error: error.message });
    }
};


// Function to remove a product from the cart
export const removeProductFromCart = async (request, response) => {
    try {
        const productId = request.params.productId;
        const userId = request.userId;

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: "User not found!" });
        }

        const productIndex = user.products.findIndex(product => product.productId.toString() === productId);
        if (productIndex === -1) {
            return response.status(404).json({ message: "Product not found in cart" });
        }

        if (user.products[productIndex].quantity > 1) {
            user.products[productIndex].quantity -= 1;
        } else {
            user.products.splice(productIndex, 1);
        }

        await user.save();

        // Check if user still has products in the cart
        if (user.products.length > 0) {
            // Populate product details after save
            const populatedUser = await User.findById(userId).populate({
                path: 'products.productId',
                model: models[user.products[0].category] // Use the category of the first product in the cart
            });

            return response.status(200).json({ message: "Product updated in cart !", products: populatedUser.products });
        } else {
            return response.status(200).json({ message: "Product removed from cart Successful !", products: [] });
        }

    } catch (error) {
        console.error("Failed to remove a product", error);
        return response.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//controller for Delete all cart products
export const clearCart = async (request, response) => {
    try {
        const userId = request.userId;

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: "User not found!" });
        }

        if (user.products.length === 0) { 
            return response.status(400).json({ message: 'Cart is already empty !' });
        }

        await User.updateOne({ _id: userId }, { $set: { products: [] } });

        response.status(200).json({ message: 'Successfully cleared cart products !' });
    } catch (error) {
        console.error("Failed to clear cart products", error);
        return response.status(500).json({ message: "Internal server error", error: error.message });
    }
}

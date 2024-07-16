import Electronics from "../Models/ElectronicProductsSchema.js";
import Furniture from "../Models/FurnituresSchema.js";
import MensProduct from "../Models/MensProductsSchema.js";
import WomensProducts from "../Models/WomensProductsSchema.js";
import stripe from 'stripe';
import dotenv from 'dotenv';


dotenv.config();

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    const { items } = req.body;

    try {
        const lineItems = await Promise.all(items.map(async (item) => {
            let product;
            switch (item.category) {
                case 'electronics':
                    product = await Electronics.findById(item.productId._id);
                    break;
                case 'furniture':
                    product = await Furniture.findById(item.productId._id);
                    break;
                case 'mens':
                    product = await MensProduct.findById(item.productId._id);
                    break;
                case 'womens':
                    product = await WomensProducts.findById(item.productId._id);
                    break;
                default:
                    return res.status(400).json({ error: 'Invalid product category' });
            }
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.product_name || product.Brand || product.brand || product.ProductTitle,
                        images: [product.product_image || product.id_image || product.ImageURL || product.primary_image],
                    },
                    unit_amount: product.price * 100 || product.DiscountPrice * 100 || product.product_old_price * 100,
                },
                quantity: item.quantity,
            };
        }));

        const session = await stripeClient.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
        });

        res.json({ id: session.id });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
};

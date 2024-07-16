import mongoose from 'mongoose';
import Electronics from "./ElectronicProductsSchema.js";
import Furniture from "./FurnituresSchema.js";
import MensProduct from "./MensProductsSchema.js";
import WomensProducts from "./WomensProductsSchema.js";


const models = {
    electronics: mongoose.model('Electronics', Electronics.schema),
    mens: mongoose.model('MensProduct', MensProduct.schema),
    womens: mongoose.model('WomensProduct', WomensProducts.schema),
    furniture: mongoose.model('Furniture', Furniture.schema)
};

export default models
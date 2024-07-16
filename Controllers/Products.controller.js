import mongoose from 'mongoose';
import Electronics from "../Models/ElectronicProductsSchema.js";
import Furniture from "../Models/FurnituresSchema.js";
import MensProduct from "../Models/MensProductsSchema.js";
import WomensProducts from "../Models/WomensProductsSchema.js";

// Controller function to handle POST request for inserting electronics data
export const addElectronicsData = async (req, res) => {
    try {
        // Extract electronics data from request body
        const electronicsData = req.body //Array of objects of electronic products

        // Insert data into MongoDB using Mongoose model
        const insertedElectronicProducts = await Electronics.insertMany(electronicsData);

        // Send success response with inserted data
        res.status(200).json({
            message: 'Electronics inserted successfully',
            ElectronicsData: insertedElectronicProducts
        });
        console.log(res.message);

    } catch (error) {
        // Handle errors
        console.error('Error inserting electronics:', error);
        res.status(500).json({ message: 'Failed to insert electronics', error: error.message });
    }
};

// Controller function to handle POST request for inserting mens product data
export const addMensProductsData = async (req, res) => {
    try {
        // Extract electronics data from request body
        const mensProductData = req.body

        // Insert data into MongoDB using Mongoose model
        const insertedMensProducts = await MensProduct.insertMany(mensProductData);

        // Send success response with inserted data
        res.status(200).json({
            message: 'mensProductData inserted successfully',
            mensProductsData: insertedMensProducts
        });
        console.log(res.message);

    } catch (error) {
        // Handle errors
        console.error('Error inserting mensProductsData:', error);
        res.status(500).json({ message: 'Failed to insert mensProductsData', error: error.message });
    }
};

// Controller function to handle POST request for inserting womens product data
export const addWomensProductsData = async (req, res) => {
    try {
        // Extract electronics data from request body
        const womensProductData = req.body

        // Insert data into MongoDB using Mongoose model
        const insertedWomensProducts = await WomensProducts.insertMany(womensProductData);

        // Send success response with inserted data
        res.status(200).json({
            message: 'womensProductData inserted successfully',
            womensProductsData: insertedWomensProducts
        });
        console.log(res.message);

    } catch (error) {
        // Handle errors
        console.error('Error inserting womensProductData:', error);
        res.status(500).json({ message: 'Failed to insert womensProductData', error: error.message });
    }
};

// Controller function to handle POST request for inserting Furniture product data
export const addFurnitureProductsData = async (req, res) => {
    try {
        // Extract electronics data from request body
        const furnitureProductData = req.body

        // Insert data into MongoDB using Mongoose model
        const insertedFurnitureProducts = await Furniture.insertMany(furnitureProductData);

        // Send success response with inserted data
        res.status(200).json({
            message: 'Furniture inserted successfully',
            furnitureProductsData: insertedFurnitureProducts
        });
        console.log(res.message);

    } catch (error) {
        // Handle errors
        console.error('Error inserting Furniture:', error);
        res.status(500).json({ message: 'Failed to insert Furniture', error: error.message });
    }
};

//Controller function for handle GET request from inserted Electronic Schema in Db
export const fetchElectronicsData = async (request, response) => {
    try {
        //Find electronics from DB
        const electronicsData = await Electronics.find()
        response.status(200).json({ message: 'Electronics Data Fetched SuccessFull', ElectronicsData: electronicsData })
    } catch (error) {
        // handle error 
        console.error('Error Fetching electronics:', error);
        response.status(500).json({ message: 'Failed to Fetching electronics', error: error.message });
    }
}

//Controller function for handle GET request from inserted MensProduct Schema in Db
export const fetchMenProductsData = async (request, response) => {
    try {
        //Find MensProduct from DB
        const mensProductData = await MensProduct.find()
        response.status(200).json({ message: 'WomensProduct Data Fetched SuccessFull', MensProductData: mensProductData })
    } catch (error) {
        // handle error 
        console.error('Error Fetching MensProduct:', error);
        response.status(500).json({ message: 'Failed to Fetching MensProduct', error: error.message });
    }
}

//Controller function for handle GET request from inserted WomensProduct Schema in Db
export const fetchWomenProductsData = async (request, response) => {
    try {
        //Find WomensProduct from DB
        const womensProductData = await WomensProducts.find()
        response.status(200).json({ message: 'WomensProduct Data Fetched SuccessFull', WomensProductData: womensProductData })
    } catch (error) {
        // handle error 
        console.error('Error Fetching WomensProduct:', error);
        response.status(500).json({ message: 'Failed to Fetching WomensProduct', error: error.message });
    }
}

//Controller function for handle GET request from inserted furnitureProduct Schema in Db
export const fetchFurnitureProductsData = async (request, response) => {
    try {
        //Find furnitureProduct from DB
        const furnitureProductData = await Furniture.find()
        response.status(200).json({ message: 'furnitureProduct Data Fetched SuccessFull', FurnitureProductData: furnitureProductData })
    } catch (error) {
        // handle error 
        console.error('Error Fetching furnitureProduct:', error);
        response.status(500).json({ message: 'Failed to Fetching furnitureProduct', error: error.message });
    }
}

export const fetchMobilesFromElectronics = async (request, response) => {
    try {
        // Find all documents in the Electronics collection where main_category is 'mobiles'
        const mobilesData = await Electronics.find({ main_category: 'mobiles' });
        response.status(200).json({ message: "Filtered Mobiles from electronics data", mobilesData: mobilesData });
    } catch (error) {
        console.error("Error Fetching mobiles data", error);
        response.status(500).json({ message: "Failed to fetch mobiles data from electronics", error: error.message });
    }
};

export const fetchTelevisionFromElectronics = async (request, response) => {
    try {
        // Find all documents in the Electronics collection where main_category is 'tv'
        const televisionData = await Electronics.find({ main_category: 'tv' });
        response.status(200).json({ message: "Filtered tv from electronics data", televisionData: televisionData });
    } catch (error) {
        console.error("Error Fetching tv data", error);
        response.status(500).json({ message: "Failed to fetch tv data from electronics", error: error.message });
    }
};

export const fetchLaptopFromElectronics = async (request, response) => {
    try {
        // Find all documents in the Electronics collection where main_category is 'Laptop'
        const laptopData = await Electronics.find({ main_category: 'laptop' });
        response.status(200).json({ message: "Filtered laptopData from electronics data", laptopData: laptopData });
    } catch (error) {
        console.error("Error Fetching laptopData data", error);
        response.status(500).json({ message: "Failed to fetch laptopData data from electronics", error: error.message });
    }
};

export const fetchAndroidWatchFromElectronics = async (request, response) => {
    try {
        // Find all documents in the Electronics collection where main_category is 'android watch'
        const androidWatchData = await Electronics.find({ main_category: 'android watch' });
        response.status(200).json({ message: "Filtered android watch from electronics data", androidWatchData: androidWatchData });
    } catch (error) {
        console.error("Error Fetching android watch data", error);
        response.status(500).json({ message: "Failed to fetch android watch data from electronics", error: error.message });
    }
};



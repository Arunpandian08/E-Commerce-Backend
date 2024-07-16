import express from 'express'
import {
    addElectronicsData,
    addFurnitureProductsData,
    addMensProductsData,
    addWomensProductsData,
    fetchAndroidWatchFromElectronics,
    fetchElectronicsData,
    fetchFurnitureProductsData,
    fetchLaptopFromElectronics,
    fetchMenProductsData,
    fetchMobilesFromElectronics,
    fetchTelevisionFromElectronics,
    fetchWomenProductsData
} from '../Controllers/Products.controller.js'


const router = express.Router()

//router to  post or add Electronic products route
router.post('/electronics', addElectronicsData)
//router to  Fetch electronic products data
router.get('/get-electronics', fetchElectronicsData)

// Route to fetch mobiles data from electronics
router.get('/electronics/mobiles', fetchMobilesFromElectronics);

// Route to fetch Television data from electronics
router.get('/electronics/tv', fetchTelevisionFromElectronics);

// Route to fetch laptop data from electronics
router.get('/electronics/laptop', fetchLaptopFromElectronics);

// Route to fetch watch data from electronics
router.get('/electronics/android-watch', fetchAndroidWatchFromElectronics);

//router to post or add Mens Products 
router.post('/mens', addMensProductsData)
//router to  Fetch Mens products data
router.get('/get-mens', fetchMenProductsData)

//router to  post or add Womens Products 
router.post('/womens', addWomensProductsData)
//router to Fetch Womens products data
router.get('/get-womens', fetchWomenProductsData)

//router to  add or post Furniture Products 
router.post('/furniture', addFurnitureProductsData)
//router to Fetch Furniture products data
router.get('/get-furniture', fetchFurnitureProductsData)

export default router
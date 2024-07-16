import express from 'express'
import { addProductToCart, clearCart, fetchCartProducts, removeProductFromCart } from '../Controllers/CartController.js'
import verifiedUser from '../Middleware/auth.js'

const router = express.Router()

//router to fetch cart products
router.get('/cart',verifiedUser,fetchCartProducts)
//router to add cart router
router.post('/add-to-cart',verifiedUser,addProductToCart) 
// router to remove or delete a product based on productId from cart
router.delete('/remove-from-cart/:productId',verifiedUser, removeProductFromCart) 
//router to delete all products in cart
router.delete('/clear-cart',verifiedUser,clearCart)

export default router

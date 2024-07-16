import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import cookiesParser from 'cookie-parser'
import connectDB from './DataBase/DBConfig.js'
import productsRouter from './Routers/products.Router.js'
import userRouter from './Routers/user.router.js'
import cartRouter from './Routers/cart.router.js';
import paymentRouter from './Routers/payment.router.js';


//Config ENVIRONMENT FILE
dotenv.config()

// APP CONNECT WITH EXPRESS FRAME WORK
const app = express()

//APP IS USING CORS POLICY
app.use(cors(
    { origin: process.env.CLIENT_URL, credentials: true }
))

// Resolve __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'uploads')));


//USING EXPRESS TO PROCESS A DATA AS JSON FORMATE
app.use(express.json())

// use cookie-parser
app.use(cookiesParser())

// CONNECT AND IMPORT MONGODB 
connectDB()

//PROCESS THE PORT FROM ENVIRONMENT FILE
const port = process.env.PORT || 3000;


// router setup
app.use('/api', productsRouter)
app.use('/api/user', userRouter)
app.use('/api',cartRouter)
app.use('/api/payment',paymentRouter)

//START SERVER
app.listen(port, () => {
    console.log(`Server is running at - ${port}`);
})


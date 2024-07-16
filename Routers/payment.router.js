import express from 'express'
import { createCheckoutSession } from '../Controllers/StripePaymentController.js';
import verifiedUser from '../Middleware/auth.js';

const router = express.Router()

// Middleware for setting Content Security Policy
router.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
        "default-src 'self'; " +
        "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://js.stripe.com; " +
        "script-src 'self' https://js.stripe.com; " +
        "connect-src 'self' https://api.stripe.com; " +
        "frame-src 'self' https://js.stripe.com; " +
        "style-src 'self' https://fonts.googleapis.com; " +
        "img-src 'self' https://*.stripe.com;"
    );
    next();
});

router.post('/create-checkout-session', verifiedUser, createCheckoutSession);

export default router
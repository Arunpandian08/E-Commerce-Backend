import express from 'express';
import verifiedUser from '../Middleware/auth.js';
import { SignInUser, addUserProfileData, getUser, logout, registerUser } from '../Controllers/User.controller.js';
import { upload } from '../Middleware/multer.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', SignInUser);
router.get('/profile', verifiedUser, getUser);
router.post('/profile/upload', verifiedUser, upload.single('profileImage'), addUserProfileData);
router.get('/logout', logout);

export default router;

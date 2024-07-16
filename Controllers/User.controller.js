import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path'
import User from '../Models/userSchema.js';

dotenv.config();

export const registerUser = async (request, response) => {
    try {
        const { email, password, confirmPassword } = request.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(409).json({ message: "User already exists" });
        }

        if (password !== confirmPassword || !password || !confirmPassword) {
            return response.status(400).json({ message: "Passwords do not match or are empty" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
            expiresIn: '1d' // 1 day
        });
        
        response.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            secure: process.env.NODE_ENV === 'production',
        });
        
        await newUser.save();
        response.status(200).json({ 
            message: 'Register SuccessFul !', 
            token, 
            user: {
                id: newUser._id,
                email: newUser.email,
            }
        });


    } catch (error) {
        console.error("Error registering user:", error);
        response.status(500).json({ message: "Internal server error" ,error:error.message});
    }
};

export const SignInUser = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return response.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d' // 1 day
        });
        
        response.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            secure: process.env.NODE_ENV === 'production',
        });

        response.status(200).json({ 
            message: 'Login Successful !', 
            token, 
            user: {
                id: user._id,
                email: user.email,
            }
        });

    } catch (error) {
        response.status(500).json({ message: "Login failed", error: error.message });
    }
};

export const getUser = async (request, response) => {
    try {
        const userId = request.userId;
        const user = await User.findById(userId).select('-password -__v');
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        response.status(200).json({ message: "User data fetched successfully", user });
    } catch (error) {
        response.status(500).json({ message: "Failed to get user", error: error.message });
    }
}

export const logout = async (request, response) => {
    try {
        response.clearCookie('token');
        response.status(200).json({ message: 'User logged out' });
    } catch (error) {
        response.status(500).json({ message: "Failed to logout user", error: error.message });
    }
}

export const addUserProfileData = async (request, response) => {
    try {
        const { name, mobileNumber, addressLine1, addressLine2, zipCode } = request.body;
        const userId = request.user;
        // console.log(userId);
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: 'User not found! Please log in again.' });
        }

        if (request.file) {
            user.profileImage = `/uploads/${request.file.filename}`; // Save relative path
        }

        if (name) user.name = name;
        if (mobileNumber) user.mobileNumber = mobileNumber;
        if (addressLine1 || addressLine2 || zipCode) {
            user.address = user.address || {};
            if (addressLine1) user.address.addressLine1 = addressLine1;
            if (addressLine2) user.address.addressLine2 = addressLine2;
            if (zipCode) user.address.zipCode = zipCode;
        }

        await user.save();
        response.status(200).json({ message: 'User profile updated successfully', user });

    } catch (error) {
        console.error('Error saving user data:', error);
        response.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};


// Auth Controller
// Handles user authentication: registration and login
// Uses bcrypt for password hashing and JWT for authentication tokens
// Auth Controller
// Handles user authentication: registration and login
// Uses bcrypt for password hashing and JWT for authentication tokens
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

// JWT secret (should be in environment variable)
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

/**
 * POST /api/register
 * Register a new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Validation: check required fields
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    //passwordregex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Return success response (don't send password back)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin, // Include admin status
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

/**
 * POST /api/login
 * Login user and return JWT token
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation: check required fields
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Return success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin, // Include admin status
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

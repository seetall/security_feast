import crypto from "crypto";
import User from "../models/userModels.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { z } from "zod"; // Zod for schema validation

// Zod validation schemas
const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(50, { message: "Full name cannot exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "Password must include uppercase, lowercase, numbers, and special characters.",
    }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

// Register endpoint
export const createUser = async (req, res) => {
  try {
    // Validate input using Zod schema
    registerSchema.parse(req.body);
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ fullName, email, password: hashedPassword });

    // Generate verification token
    const verificationToken = newUser.generateVerificationToken();

    await newUser.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ success: false, message: error.errors[0].message });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login endpoint with brute-force prevention
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per windowMs
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginUser = [
  loginLimiter, // Apply brute-force prevention
  async (req, res) => {
    try {
      // Validate input using Zod schema
      loginSchema.parse(req.body);
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      if (!user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Please verify your email before logging in.",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect password" });
      }

      // Generate a secure JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        userData: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({ success: false, message: error.errors[0].message });
      }
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
];

// Function to send verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: ${verificationLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

// Verification function
// export const verifyUser = async (req, res) => {
//   const { token } = req.params;
//   console.log("Received token:", token); // Debugging log

//   try {
//     const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//     console.log("Hashed token:", hashedToken); // Debugging log

//     const user = await User.findOne({
//       verificationToken: hashedToken,
//       verificationTokenExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       console.log("Invalid or expired token");
//       return res
//         .status(400)
//         .json({ success: false, message: "Token is invalid or has expired" });
//     }

//     user.isVerified = true;
//     user.verificationToken = undefined;
//     user.verificationTokenExpires = undefined;
//     await user.save();

//     console.log("Account verified successfully for user:", user.email);

//     return res.status(200).json({
//       success: true,
//       message: "Account verified successfully. You can now log in.",
//     });
//   } catch (error) {
//     console.error("Error verifying user:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


export const verifyUser = async (req, res) => {
  const { token } = req.params;
  console.log("Received token:", token); // Debugging log

  try {
    // Directly use the token from the URL, no need to hash it
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }, // Ensure token has not expired
    });

    if (!user) {
      console.log("Invalid or expired token");
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    console.log("Account verified successfully for user:", user.email);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Account verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the user with the new password
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


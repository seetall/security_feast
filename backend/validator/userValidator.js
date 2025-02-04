import { z } from "zod";

// Schema for user registration
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(50, { message: "Full name cannot exceed 50 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "Password must include uppercase, lowercase, numbers, and special characters",
    }),
  role: z
    .enum(["user", "admin"])
    .optional(), // Optional, defaults to "user" in the database
});

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

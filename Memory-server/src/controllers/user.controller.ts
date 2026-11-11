import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import * as userService from "../services/user.service.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      res
        .status(409)
        .json({ message: "A user with this email address already exists" });
      return;
    }

    const newUser = userService.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordhash);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      // secure: true
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

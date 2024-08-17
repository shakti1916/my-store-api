import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { userModel } from "../../models/userModel";
import jwt from "jsonwebtoken";

export const UserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new Error("Invalid email and password");
    }

    const tokenData = {
      userId: user._id,
      email: user.email,
      role: user.role,
      userName:user.username
      
    };

    console.log(tokenData.userName + " ugug")

    const token = jwt.sign(tokenData,
        process.env.JWT_SCERET as string, {
      expiresIn: "1h",
    });

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, tokenOption).status(201).json({
      success: true,
      data: tokenData,
      error: false,
      message: "Login Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      errorMessage: error.message,
      success: false,
      error: true,
    });
  }
};

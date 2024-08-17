import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { userModel } from "../../models/userModel";

export const UserRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ email });

  try {
    if (user) {
      throw new Error("User already exists");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!username) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }
    const payload = {
        ...req.body,
        role:"GENERAL",
        password:hashPassword

    }

    const newUserData = new userModel(payload);
    const saveUser = await newUserData.save();
    res.status(201).json({
        success:true,
        data:saveUser,
        error:false,
        message:"User created Successfully"
    })
  } catch (error:any) {
    res.status(500).json({
        errorMessage:error.message,
        success:false,
        error:true
    })
  }
};

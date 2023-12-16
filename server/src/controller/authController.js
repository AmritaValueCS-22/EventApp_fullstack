// src/controllers/authController.js
import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    userRole: user.userRole,
  };
  const secretKey = process.env.SECRET_KEY;
  const options = { expiresIn: "12h" };

  return jwt.sign(payload, secretKey, options);
};
export const signup = async (req, res) => {
  const { username, email, password, confirmPassword, phoneNumber, userRole } =
    req.body;

  if (!username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
      statuscode: 400,
    });
  }
  if (!["organizer", "participant"].includes(userRole)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid user role. Use either "organizer" or "participant".',
      statuscode: 400,
    });
  }
  if (password !== confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Passwords do not match.", statuscode: 400 });
  }

  let user = await User.findOne({ email });
  const userData = {
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
    userRole,
  };

  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User already registered, Try to login !",
      statuscode: 400,
    });
  } else {
    User.create(userData).then((data, err) => {
      if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
      else
        res.status(StatusCodes.CREATED).json({
          message: `${userRole} created Successfully`,
          statuscode: 201,
        });
    });
  }
};

// export const signup = async (req, res) => {
//   try {
//     const {
//       username,
//       email,
//       password,
//       confirmPassword,
//       phoneNumber,
//       userRole,
//     } = req.body;

//     const checkuserisAlredyThere = await User.find();
//     console.log(checkuserisAlredyThere);
//     if (checkuserisAlredyThere) {
//       console.log("hello");
//       return res.status(400).json({ error: "User Alredy Register" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match." });
//     }

//     const userData = new User({
//       username,
//       email,
//       password,
//       confirmPassword,
//       phoneNumber,
//       userRole,
//     });
//     await user.save();

//     res.status(201).json({
//       statusCode: 201,
//       message: `${userRole} registered successfully.`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(
    //   hashPassword,
    //   user.password,
    //   await bcrypt.compare(hashPassword, user.password)
    // );
    if (user) {
      const token = generateToken(user);

      return res.status(StatusCodes.OK).json({
        message: "Login successful",
        userRole: user.userRole,
        userId: user.userId,
        phoneNumber: user.phoneNumber,
        token,
        isUserHaveProfile: user.profile.length > 0,
        statuscode: 200,
      });
    }
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid credentials",
      statuscode: 400,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Internal Server Error", statuscode: 400 });
  }
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "acctprabhuk@gmail.com",
    pass: "Ainsd$547",
  },
});
const generateResetToken = () => {
  return new Promise((resolve, reject) => {
    const token = crypto.randomBytes(20).toString("hex");
    const expirationTime = Date.now() + 60 * 60 * 1000; // Set expiration time to 1 hour

    resolve({ token, expirationTime });
  });
};
export const resetMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const { token, expirationTime } = await generateResetToken();
    // Send reset email
    const mailOptions = {
      from: "acctprabhuk@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: memo://reset/${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    // Check if the token and email match the stored values
    const storedTokenInfo = tokenStore.get(email);

    if (
      !storedTokenInfo ||
      storedTokenInfo.token !== token ||
      Date.now() > storedTokenInfo.expirationTime
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Reset password logic (replace with your own password reset implementation)
    // For simplicity, we'll just log the new password
    console.log(`Password reset for ${email}. New password: ${newPassword}`);

    // Remove the used token from the store
    tokenStore.delete(email);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match." });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Username already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy/username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl/username=${username}`;
    await User.create({
      fullname,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.status(201).json({
      msg: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid username or password.", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid username or password.", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        profilePhoto: user.profilePhoto,
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

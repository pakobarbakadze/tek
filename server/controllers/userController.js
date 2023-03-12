import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).send("Username or password missing");

    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).send("User doesnt exist");

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) return res.status(401).send("Invalid password");

    const token = await user.generateAuthToken();
    console.log(token);

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

export { authUser, registerUser, getUsers };

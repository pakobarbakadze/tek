import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    delete user._doc.password;
    res.send({ userData: user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// @desc    User sign out
// @route   POST /api/users/signOut
// @access  Public
const userSignout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.body.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const user = new User(req.body);

  try {
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

export { authUser, registerUser, getUsers, userSignout };

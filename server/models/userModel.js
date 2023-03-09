import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      requre: true,
    },
    lastName: {
      type: String,
      requre: true,
    },
    pId: {
      type: String,
      require: true,
      unique: true,
      minLength: 11,
      maxLength: 11,
    },
    phone: {
      type: Number,
      require: true,
      unique: true,
      min: 100000000,
      max: 999999999,
    },
    email: {
      type: String,
      requre: true,
      unique: true,
    },
    password: {
      type: String,
      requre: true,
    },
    isAdmin: {
      type: Boolean,
      requre: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// generate authentication token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

//hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;

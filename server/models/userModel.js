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
  return token;
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

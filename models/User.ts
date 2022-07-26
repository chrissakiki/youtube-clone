import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  subscribers?: number;
  subscribedChannels?: string[];
  saved: string[];
  google?: boolean;
  _doc?: any;
  comparePassword: (password: string) => boolean;
  createJWT: () => string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Please provide your username"],
      minlength: 6,
      maxlength: 20,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/db9pqndbj/image/upload/v1658442486/profilepic_x6azoj.jpg",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedChannels: {
      type: [String],
    },
    saved: {
      type: [String],
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);

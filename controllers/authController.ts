import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index";

const signup = async (req: express.Request, res: express.Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  if (username.length < 6) {
    throw new BadRequestError("Username should be at least 6 characters");
  }

  if (password.length < 6) {
    throw new BadRequestError("Password should be at least 6 characters");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new BadRequestError("Email has already been taken!");
  }

  const user = await User.create({ username, email, password });

  res.status(StatusCodes.CREATED).json({
    user: {
      ...user._doc,
      password: undefined,
    },
  });
};

const signin = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  res
    .cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 72,
    })
    .status(StatusCodes.OK)
    .json({
      user: {
        ...user._doc,
        password: undefined,
      },
    });
};

const googleSignin = async (req: express.Request, res: express.Response) => {
  const { email, username, avatar } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const token = user.createJWT();
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(StatusCodes.OK)
      .json(user);
  } else {
    const newUser = await User.create({
      email,
      username,
      avatar,
      google: true,
    });
    const token = newUser.createJWT();
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 72,
      })
      .status(StatusCodes.CREATED)
      .json(newUser);
  }
};

const logout = async (req: express.Request, res: express.Response) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res
    .clearCookie("access_token", { path: "/" })
    .status(StatusCodes.OK)
    .send("Removed");
};

export { signup, signin, googleSignin, logout };

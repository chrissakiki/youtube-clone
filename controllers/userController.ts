import express from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index";
import User from "../models/User";
import Video from "../models/Video";

//update user

const updateUser = async (req: express.Request, res: express.Response) => {
  if (req.params.id === req.user._id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updatedUser);
  } else {
    throw new BadRequestError("Something went wrong!");
  }
};

//delete user

const deleteUser = async (req: express.Request, res: express.Response) => {
  if (req.params.id === req.user._id) {
    await User.findByIdAndDelete(req.user._id);
    res.status(StatusCodes.OK).json("User has been deleted");
  } else {
    throw new BadRequestError("Something went wrong!");
  }
};

//get user
const getUser = async (req: express.Request, res: express.Response) => {
  const user = await User.findById(req.params.id);
  res.status(StatusCodes.OK).json(user);
};

const changeAvatar = async (req: express.Request, res: express.Response) => {
  console.log("here" + req.body.avatar);
  await User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar });
  res.status(StatusCodes.OK).json("avatar updated");
};

//subscribe
const subscribe = async (req: express.Request, res: express.Response) => {
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { subscribedChannels: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: 1 },
  });
  res.status(StatusCodes.OK).json("subscribed");
};

const unsubscribe = async (req: express.Request, res: express.Response) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { subscribedChannels: req.params.id },
  });
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { subscribers: -1 },
  });
  res.status(StatusCodes.OK).json("Unsubscribed");
};

//like video
const like = async (req: express.Request, res: express.Response) => {
  await Video.findByIdAndUpdate(req.params.videoId, {
    $addToSet: { likes: req.user._id },
    $pull: { dislikes: req.user._id },
  });

  res.status(StatusCodes.OK).json("Liked");
};

//dislike video
const dislike = async (req: express.Request, res: express.Response) => {
  await Video.findByIdAndUpdate(req.params.videoId, {
    $addToSet: { dislikes: req.user._id },
    $pull: { likes: req.user._id },
  });

  res.status(StatusCodes.OK).json("DisLiked");
};

const saveVideo = async (req: express.Request, res: express.Response) => {
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { saved: req.params.videoId },
  });

  res.status(StatusCodes.OK).json("Saved");
};

const unsaveVideo = async (req: express.Request, res: express.Response) => {
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { saved: req.params.videoId },
  });

  res.status(StatusCodes.OK).json("unSaved");
};

export {
  updateUser,
  deleteUser,
  changeAvatar,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  saveVideo,
  unsaveVideo,
};

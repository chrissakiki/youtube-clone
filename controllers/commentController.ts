import express from "express";
import Comment from "../models/Comment";
import { StatusCodes } from "http-status-codes";
import {
  NotFoundError,
  BadRequestError,
  UnAuthenticatedError,
} from "../errors/index";
import Video from "../models/Video";

// add comment
const addComment = async (req: express.Request, res: express.Response) => {
  const newComment = await Comment.create({
    ...req.body,
    postedBy: req.user._id,
  });

  const comment = await newComment.populate("postedBy");

  res.status(StatusCodes.CREATED).json(comment);
};

// delete comment
const deleteComment = async (req: express.Request, res: express.Response) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    throw new NotFoundError("Could not find your comment");
  }

  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new NotFoundError("Could not find the video");
  }

  if (req.user._id === comment.postedBy || req.user._id === video.postedBy) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("comment has been deleted");
  } else {
    throw new UnAuthenticatedError("Not Allowed!");
  }
};

// get comments
const getComments = async (req: express.Request, res: express.Response) => {
  const comments = await Comment.find({ videoId: req.params.videoId })
    .populate("postedBy")
    .sort("-createdAt");

  res.status(StatusCodes.OK).json(comments);
};

//like video
const likeComment = async (req: express.Request, res: express.Response) => {
  const comment = await Comment.findByIdAndUpdate(req.params.commentId, {
    $addToSet: { likes: req.user._id },
    $pull: { dislikes: req.user._id },
  }).populate("postedBy");

  // .populate({
  //   path: "likes",
  //   model: "User",
  // });

  res.status(StatusCodes.OK).json("liked");
};

//dislike video
const dislikeComment = async (req: express.Request, res: express.Response) => {
  const comment = await Comment.findByIdAndUpdate(req.params.commentId, {
    $addToSet: { dislikes: req.user._id },
    $pull: { likes: req.user._id },
  }).populate("postedBy");

  res.status(StatusCodes.OK).json("disliked");
};

export { addComment, deleteComment, getComments, likeComment, dislikeComment };

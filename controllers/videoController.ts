import express from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index";
import Video from "../models/Video";

// add vid
const addVideo = async (req: express.Request, res: express.Response) => {
  const newVideo = new Video({ postedBy: req.user._id, ...req.body });

  const savedVideo = await newVideo.save();
  res.status(StatusCodes.CREATED).json(savedVideo);
};

//update vid
const updateVideo = async (req: express.Request, res: express.Response) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new NotFoundError("Could not find the video");
  }

  if (req.user._id === video.postedBy) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json(updatedVideo);
  } else {
    throw new BadRequestError("You shouldn't be here");
  }
};

//delete video
const deleteVideo = async (req: express.Request, res: express.Response) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new NotFoundError("Could not find the video");
  }

  if (req.user._id === video.postedBy) {
    await Video.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.OK).json("Your video has been deleted");
  } else {
    throw new BadRequestError("You shouldn't be here");
  }
};

// get video
const getVideo = async (req: express.Request, res: express.Response) => {
  const video = await Video.findById(req.params.id).populate("postedBy");
  res.status(StatusCodes.OK).json(video);
};

// add views
const addView = async (req: express.Request, res: express.Response) => {
  const video = await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  });
  res.status(StatusCodes.OK).json("increased view by 1");
};

// random videos
const random = async (req: express.Request, res: express.Response) => {
  // const rand = Math.floor(Math.random() * 20);
  const rand = 1;
  const videos = await Video.find().skip(rand).populate("postedBy");

  res.status(StatusCodes.OK).json(videos);
};

const trend = async (req: express.Request, res: express.Response) => {
  const videos = await Video.find().sort({ views: -1 }).populate("postedBy");
  res.status(StatusCodes.OK).json(videos);
};

const categories = async (req: express.Request, res: express.Response) => {
  let cat = <string>req.params.cat;

  console.log(cat);

  const videos = await Video.find({ tags: { $in: cat } })
    .limit(40)
    .populate("postedBy");
  res.status(StatusCodes.OK).json(videos);
};

const sub = async (req: express.Request, res: express.Response) => {
  const user = await User.findById(req.user._id);

  if (!user) return;

  const subcribedChannels = user.subscribedChannels;

  if (subcribedChannels) {
    const list = await Promise.all(
      subcribedChannels.map((channelId) => {
        return Video.find({ postedBy: channelId }).populate("postedBy");
      })
    );

    res
      .status(StatusCodes.OK)
      .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } else {
    throw new BadRequestError(
      "Looks like you haven't subscribed to anyone yet"
    );
  }
};

const savedVideos = async (req: express.Request, res: express.Response) => {
  const user = await User.findById(req.user._id);

  if (!user) return;

  const savedVideos = user.saved;

  if (savedVideos) {
    const videos = await Video.find({ _id: { $in: savedVideos } })
      .limit(20)
      .populate("postedBy");

    res.status(StatusCodes.OK).json(videos);
  } else {
    throw new BadRequestError("Something went wrong");
  }
};

const search = async (req: express.Request, res: express.Response) => {
  const searchQuery = req.query.search_query;
  const videos = await Video.find({
    title: { $regex: searchQuery, $options: "i" },
  })
    .limit(40)
    .populate("postedBy");
  res.status(StatusCodes.OK).json(videos);
};

//video tags
const tags = async (req: express.Request, res: express.Response) => {
  let tagsQuery = (<string>req.query.tags).split(",");

  console.log(tagsQuery);

  const videos = await Video.find({ tags: { $in: tagsQuery } })
    .limit(10)
    .populate("postedBy");
  res.status(StatusCodes.OK).json(videos);
};

// get tags
const getTags = async (req: express.Request, res: express.Response) => {
  // const rand = Math.floor(Math.random() * 20);
  const rand = 0;
  const videos = await Video.find().limit(30).skip(rand).populate("postedBy");

  const tags = videos
    .map((vid) => {
      return vid.tags;
    })
    .flat();
  console.log("you here");
  res.status(StatusCodes.OK).json([...new Set(tags)]);
};

export {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  random,
  trend,
  categories,
  sub,
  search,
  tags,
  savedVideos,
  getTags,
};

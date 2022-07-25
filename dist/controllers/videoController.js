"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = exports.savedVideos = exports.tags = exports.search = exports.sub = exports.categories = exports.trend = exports.random = exports.addView = exports.getVideo = exports.deleteVideo = exports.updateVideo = exports.addVideo = void 0;
const User_1 = __importDefault(require("../models/User"));
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const Video_1 = __importDefault(require("../models/Video"));
// add vid
const addVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newVideo = new Video_1.default(Object.assign({ postedBy: req.user._id }, req.body));
    const savedVideo = yield newVideo.save();
    res.status(http_status_codes_1.StatusCodes.CREATED).json(savedVideo);
});
exports.addVideo = addVideo;
//update vid
const updateVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield Video_1.default.findById(req.params.id);
    if (!video) {
        throw new index_1.NotFoundError("Could not find the video");
    }
    if (req.user._id === video.postedBy) {
        const updatedVideo = yield Video_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(http_status_codes_1.StatusCodes.OK).json(updatedVideo);
    }
    else {
        throw new index_1.BadRequestError("You shouldn't be here");
    }
});
exports.updateVideo = updateVideo;
//delete video
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield Video_1.default.findById(req.params.id);
    if (!video) {
        throw new index_1.NotFoundError("Could not find the video");
    }
    if (req.user._id === video.postedBy) {
        yield Video_1.default.findByIdAndDelete(req.params.id);
        res.status(http_status_codes_1.StatusCodes.OK).json("Your video has been deleted");
    }
    else {
        throw new index_1.BadRequestError("You shouldn't be here");
    }
});
exports.deleteVideo = deleteVideo;
// get video
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield Video_1.default.findById(req.params.id).populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.OK).json(video);
});
exports.getVideo = getVideo;
// add views
const addView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield Video_1.default.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json("increased view by 1");
});
exports.addView = addView;
// random videos
const random = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const rand = Math.floor(Math.random() * 20);
    const rand = 1;
    const videos = yield Video_1.default.find().skip(rand).populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.OK).json(videos);
});
exports.random = random;
const trend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield Video_1.default.find().sort({ views: -1 }).populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.OK).json(videos);
});
exports.trend = trend;
const categories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cat = req.params.cat;
    console.log(cat);
    const videos = yield Video_1.default.find({ tags: { $in: cat } })
        .limit(40)
        .populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.OK).json(videos);
});
exports.categories = categories;
const sub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    if (!user)
        return;
    const subcribedChannels = user.subscribedChannels;
    if (subcribedChannels) {
        const list = yield Promise.all(subcribedChannels.map((channelId) => {
            return Video_1.default.find({ postedBy: channelId }).populate("postedBy");
        }));
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    }
    else {
        throw new index_1.BadRequestError("Looks like you haven't subscribed to anyone yet");
    }
});
exports.sub = sub;
const savedVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    if (!user)
        return;
    const savedVideos = user.saved;
    if (savedVideos) {
        const videos = yield Video_1.default.find({ _id: { $in: savedVideos } })
            .limit(20)
            .populate("postedBy");
        res.status(http_status_codes_1.StatusCodes.OK).json(videos);
    }
    else {
        throw new index_1.BadRequestError("Something went wrong");
    }
});
exports.savedVideos = savedVideos;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.search_query;
    const videos = yield Video_1.default.find({
        title: { $regex: searchQuery, $options: "i" },
    })
        .limit(40)
        .populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.OK).json(videos);
});
exports.search = search;
//video tags
const tags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tagsQuery = req.query.tags.split(",");
    console.log(tagsQuery);
    const videos = yield Video_1.default.find({ tags: { $in: tagsQuery } })
        .limit(10)
        .populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.OK).json(videos);
});
exports.tags = tags;
// get tags
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const rand = Math.floor(Math.random() * 20);
    const rand = 0;
    const videos = yield Video_1.default.find().limit(30).skip(rand).populate("postedBy");
    const tags = videos
        .map((vid) => {
        return vid.tags;
    })
        .flat();
    console.log("you here");
    res.status(http_status_codes_1.StatusCodes.OK).json([...new Set(tags)]);
});
exports.getTags = getTags;

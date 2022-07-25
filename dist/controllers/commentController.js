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
exports.dislikeComment = exports.likeComment = exports.getComments = exports.deleteComment = exports.addComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const Video_1 = __importDefault(require("../models/Video"));
// add comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = yield Comment_1.default.create(Object.assign(Object.assign({}, req.body), { postedBy: req.user._id }));
    const comment = yield newComment.populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.CREATED).json(comment);
});
exports.addComment = addComment;
// delete comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment_1.default.findById(req.params.id);
    if (!comment) {
        throw new index_1.NotFoundError("Could not find your comment");
    }
    const video = yield Video_1.default.findById(req.params.id);
    if (!video) {
        throw new index_1.NotFoundError("Could not find the video");
    }
    if (req.user._id === comment.postedBy || req.user._id === video.postedBy) {
        yield Comment_1.default.findByIdAndDelete(req.params.id);
        res.status(http_status_codes_1.StatusCodes.OK).json("comment has been deleted");
    }
    else {
        throw new index_1.UnAuthenticatedError("Not Allowed!");
    }
});
exports.deleteComment = deleteComment;
// get comments
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield Comment_1.default.find({ videoId: req.params.videoId })
        .populate("postedBy")
        .sort("-createdAt");
    res.status(http_status_codes_1.StatusCodes.OK).json(comments);
});
exports.getComments = getComments;
//like video
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment_1.default.findByIdAndUpdate(req.params.commentId, {
        $addToSet: { likes: req.user._id },
        $pull: { dislikes: req.user._id },
    }).populate("postedBy");
    // .populate({
    //   path: "likes",
    //   model: "User",
    // });
    res.status(http_status_codes_1.StatusCodes.OK).json("liked");
});
exports.likeComment = likeComment;
//dislike video
const dislikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment_1.default.findByIdAndUpdate(req.params.commentId, {
        $addToSet: { dislikes: req.user._id },
        $pull: { likes: req.user._id },
    }).populate("postedBy");
    res.status(http_status_codes_1.StatusCodes.OK).json("disliked");
});
exports.dislikeComment = dislikeComment;

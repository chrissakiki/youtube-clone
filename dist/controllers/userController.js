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
exports.unsaveVideo = exports.saveVideo = exports.dislike = exports.like = exports.unsubscribe = exports.subscribe = exports.getUser = exports.changeAvatar = exports.deleteUser = exports.updateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const User_1 = __importDefault(require("../models/User"));
const Video_1 = __importDefault(require("../models/Video"));
//update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user._id) {
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(http_status_codes_1.StatusCodes.OK).json(updatedUser);
    }
    else {
        throw new index_1.BadRequestError("Something went wrong!");
    }
});
exports.updateUser = updateUser;
//delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.id === req.user._id) {
        yield User_1.default.findByIdAndDelete(req.user._id);
        res.status(http_status_codes_1.StatusCodes.OK).json("User has been deleted");
    }
    else {
        throw new index_1.BadRequestError("Something went wrong!");
    }
});
exports.deleteUser = deleteUser;
//get user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
});
exports.getUser = getUser;
const changeAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here" + req.body.avatar);
    yield User_1.default.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar });
    res.status(http_status_codes_1.StatusCodes.OK).json("avatar updated");
});
exports.changeAvatar = changeAvatar;
//subscribe
const subscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findByIdAndUpdate(req.user._id, {
        $addToSet: { subscribedChannels: req.params.id },
    });
    yield User_1.default.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json("subscribed");
});
exports.subscribe = subscribe;
const unsubscribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findByIdAndUpdate(req.user._id, {
        $pull: { subscribedChannels: req.params.id },
    });
    yield User_1.default.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json("Unsubscribed");
});
exports.unsubscribe = unsubscribe;
//like video
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Video_1.default.findByIdAndUpdate(req.params.videoId, {
        $addToSet: { likes: req.user._id },
        $pull: { dislikes: req.user._id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json("Liked");
});
exports.like = like;
//dislike video
const dislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Video_1.default.findByIdAndUpdate(req.params.videoId, {
        $addToSet: { dislikes: req.user._id },
        $pull: { likes: req.user._id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json("DisLiked");
});
exports.dislike = dislike;
const saveVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findByIdAndUpdate(req.user._id, {
        $addToSet: { saved: req.params.videoId },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json("Saved");
});
exports.saveVideo = saveVideo;
const unsaveVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findByIdAndUpdate(req.user._id, {
        $pull: { saved: req.params.videoId },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json("unSaved");
});
exports.unsaveVideo = unsaveVideo;

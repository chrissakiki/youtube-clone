"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    postedBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "id should be provided"],
    },
    title: {
        type: String,
        required: [true, "Title should be provided"],
    },
    desc: {
        type: String,
        required: [true, "Title should be provided"],
    },
    imgUrl: {
        type: String,
        required: [true, "Title should be provided"],
    },
    videoUrl: {
        type: String,
        required: [true, "Title should be provided"],
    },
    views: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Video", VideoSchema);

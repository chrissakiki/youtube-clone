"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    postedBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "id should be provided"],
    },
    videoId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Video",
        required: [true, "video id should be provided"],
    },
    desc: {
        type: String,
        required: [true, "comment should be provided"],
    },
    likes: {
        type: [mongoose_1.default.Types.ObjectId],
        default: [],
    },
    dislikes: {
        type: [mongoose_1.default.Types.ObjectId],
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Comment", CommentSchema);

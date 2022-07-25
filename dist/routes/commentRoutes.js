"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
const authenticateUser_1 = require("../middleware/authenticateUser");
// add comment;
router.post("/", authenticateUser_1.authenticateUser, commentController_1.addComment);
// delete comment;
router.delete("/:id", authenticateUser_1.authenticateUser, commentController_1.deleteComment);
// get comments;
router.get("/:videoId", commentController_1.getComments);
//like comment
router.put("/like/:commentId", authenticateUser_1.authenticateUser, commentController_1.likeComment);
//dislike comment
router.put("/dislike/:commentId", authenticateUser_1.authenticateUser, commentController_1.dislikeComment);
exports.default = router;

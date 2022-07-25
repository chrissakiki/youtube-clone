import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  likeComment,
  dislikeComment,
} from "../controllers/commentController";
const router = express.Router();
import { authenticateUser } from "../middleware/authenticateUser";

// add comment;
router.post("/", authenticateUser, addComment);
// delete comment;
router.delete("/:id", authenticateUser, deleteComment);
// get comments;
router.get("/:videoId", getComments);

//like comment
router.put("/like/:commentId", authenticateUser, likeComment);

//dislike comment
router.put("/dislike/:commentId", authenticateUser, dislikeComment);

export default router;

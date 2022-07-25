import express from "express";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getUser,
  changeAvatar,
  subscribe,
  unsubscribe,
  like,
  dislike,
  saveVideo,
  unsaveVideo,
} from "../controllers/userController";

import { authenticateUser } from "../middleware/authenticateUser";

// change Avatar
router.put("/avatar", authenticateUser, changeAvatar);

//update and delete user
router
  .route("/:id")
  .put(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

// get user
router.get("/find/:id", getUser);

//subscribe to channel
router.put("/subscribe/:id", authenticateUser, subscribe);

//unsubscribe to channel
router.put("/unsubscribe/:id", authenticateUser, unsubscribe);

//like a video
router.put("/like/:videoId", authenticateUser, like);

//dislike a video
router.put("/dislike/:videoId", authenticateUser, dislike);

//save videos
router.put("/saved/:videoId", authenticateUser, saveVideo);

//unsaveVideo
router.put("/unsaved/:videoId", authenticateUser, unsaveVideo);

export default router;

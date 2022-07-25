import express from "express";
const router = express.Router();
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  random,
  trend,
  categories,
  sub,
  savedVideos,
  search,
  tags,
  getTags,
} from "../controllers/videoController";
import { authenticateUser } from "../middleware/authenticateUser";

//add video
router.post("/", authenticateUser, addVideo);
//update video and delete video
router
  .route("/:id")
  .put(authenticateUser, updateVideo)
  .delete(authenticateUser, deleteVideo);
//get video
router.get("/find/:id", getVideo);

//views
router.put("/view/:id", addView);
//get random videos
router.get("/random", random);
//get trending videos
router.get("/trend", trend);

//get trending videos
router.get("/categories/:cat", categories);
//get subcribers videos
router.get("/subscriptions", authenticateUser, sub);

//get saved videos
router.get("/savedVideos", authenticateUser, savedVideos);
// search video
router.get("/search", search);
// categories recommendations
router.get("/tags", tags);

// get tags/cat
router.get("/gettags", getTags);

export default router;

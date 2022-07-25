"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const videoController_1 = require("../controllers/videoController");
const authenticateUser_1 = require("../middleware/authenticateUser");
//add video
router.post("/", authenticateUser_1.authenticateUser, videoController_1.addVideo);
//update video and delete video
router
    .route("/:id")
    .put(authenticateUser_1.authenticateUser, videoController_1.updateVideo)
    .delete(authenticateUser_1.authenticateUser, videoController_1.deleteVideo);
//get video
router.get("/find/:id", videoController_1.getVideo);
//views
router.put("/view/:id", videoController_1.addView);
//get random videos
router.get("/random", videoController_1.random);
//get trending videos
router.get("/trend", videoController_1.trend);
//get trending videos
router.get("/categories/:cat", videoController_1.categories);
//get subcribers videos
router.get("/subscriptions", authenticateUser_1.authenticateUser, videoController_1.sub);
//get saved videos
router.get("/savedVideos", authenticateUser_1.authenticateUser, videoController_1.savedVideos);
// search video
router.get("/search", videoController_1.search);
// categories recommendations
router.get("/tags", videoController_1.tags);
// get tags/cat
router.get("/gettags", videoController_1.getTags);
exports.default = router;

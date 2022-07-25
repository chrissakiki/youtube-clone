"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const authenticateUser_1 = require("../middleware/authenticateUser");
// change Avatar
router.put("/avatar", authenticateUser_1.authenticateUser, userController_1.changeAvatar);
//update and delete user
router
    .route("/:id")
    .put(authenticateUser_1.authenticateUser, userController_1.updateUser)
    .delete(authenticateUser_1.authenticateUser, userController_1.deleteUser);
// get user
router.get("/find/:id", userController_1.getUser);
//subscribe to channel
router.put("/subscribe/:id", authenticateUser_1.authenticateUser, userController_1.subscribe);
//unsubscribe to channel
router.put("/unsubscribe/:id", authenticateUser_1.authenticateUser, userController_1.unsubscribe);
//like a video
router.put("/like/:videoId", authenticateUser_1.authenticateUser, userController_1.like);
//dislike a video
router.put("/dislike/:videoId", authenticateUser_1.authenticateUser, userController_1.dislike);
//save videos
router.put("/saved/:videoId", authenticateUser_1.authenticateUser, userController_1.saveVideo);
//unsaveVideo
router.put("/unsaved/:videoId", authenticateUser_1.authenticateUser, userController_1.unsaveVideo);
exports.default = router;

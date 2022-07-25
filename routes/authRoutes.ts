import express from "express";
import {
  signup,
  signin,
  googleSignin,
  logout,
} from "../controllers/authController";
import { authenticateUser } from "../middleware/authenticateUser";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googlesignin", googleSignin);
router.get("/logout", logout);

export default router;

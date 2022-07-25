import express from "express";
import cors from "cors";
import connectDB from "./db/connect";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import userRoutes from "./routes/userRoutes";
import videoRoutes from "./routes/videoRoutes";
import commentRoutes from "./routes/commentRoutes";
import authRoutes from "./routes/authRoutes";
import notFoundMiddleware from "./middleware/not-found";
import errorHandleMiddleware from "./middleware/error-handler";
import cookieParser from "cookie-parser";

const app: express.Application = express();

const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
  origin: "http://localhost:3000",
  exposedHeaders: ["*", "Authorization"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//middleware routes

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const PORT = process.env.PORT;
const DB = process.env.DB;
const start = async () => {
  try {
    if (!DB) return;
    await connectDB(DB);
    app.listen(PORT, () => {
      console.log("Server is running on " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

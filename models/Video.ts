import mongoose, { Types } from "mongoose";

interface IVideo {
  postedBy: mongoose.SchemaDefinitionProperty<string>;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: number;
}

const VideoSchema = new mongoose.Schema<IVideo>(
  {
    postedBy: {
      type: mongoose.Types.ObjectId,
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
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);

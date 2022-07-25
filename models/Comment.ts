import mongoose from "mongoose";

interface IComment {
  postedBy: mongoose.SchemaDefinitionProperty<string>;
  videoId: mongoose.SchemaDefinitionProperty<string>;
  desc: string;
  likes: string[];
  dislikes: string[];
}
const CommentSchema = new mongoose.Schema<IComment>(
  {
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "id should be provided"],
    },
    videoId: {
      type: mongoose.Types.ObjectId,
      ref: "Video",
      required: [true, "video id should be provided"],
    },

    desc: {
      type: String,
      required: [true, "comment should be provided"],
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    dislikes: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);

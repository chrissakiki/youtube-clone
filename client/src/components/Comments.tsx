import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "../assets/wrappers/Comments";
import Comment from "./Comment";
import { CommentT } from "../Types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";
import { fetch } from "../axiosRequest";
import { fetchComments, addComment } from "../features/commentSlice";
import { Link } from "react-router-dom";

interface Props {
  videoId: string;
}

const Comments: FC<Props> = ({ videoId }) => {
  const [newComment, setNewComment] = useState<string>("");

  const [showButtons, setShowButtons] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.user);
  const { comments, isLoading } = useAppSelector((state) => state.comment);

  useEffect(() => {
    videoId && dispatch(fetchComments(videoId));
  }, [videoId]);

  const handleComment = async () => {
    if (!newComment) return;
    try {
      const { data } = await fetch.post("/comments", {
        desc: newComment,
        videoId,
      });
      setNewComment("");
      dispatch(addComment(data));
      toast.success("Comment has been added");
      setShowButtons(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Wrapper>
      <span className="comment-length"> {comments?.length} Comments</span>
      {currentUser ? (
        <div className="new-comment">
          <div className="input-container">
            <img className="avatar" src={currentUser?.avatar} alt="avatar" />
            <input
              type="text"
              placeholder="Add a comment.."
              onFocus={() => setShowButtons(true)}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
          </div>
          <div
            className={
              showButtons ? "button-container show" : "button-container"
            }
          >
            <button
              className="cancel-btn"
              onClick={() => {
                setShowButtons(false);
                setNewComment("");
              }}
            >
              Cancel
            </button>
            <button className="comment-btn" onClick={handleComment}>
              Comment
            </button>
          </div>
        </div>
      ) : (
        <p className="comment-login">
          Please{" "}
          <Link to="/signin" className="link">
            {" "}
            Signin{" "}
          </Link>{" "}
          to add a comment
        </p>
      )}
      <>
        {comments?.map((comment) => (
          <React.Fragment key={comment?._id}>
            <Comment comment={comment} isLoading={isLoading} />;
          </React.Fragment>
        ))}
      </>
    </Wrapper>
  );
};

export default Comments;

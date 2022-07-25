import React, { FC } from "react";
import { Wrapper } from "../assets/wrappers/Comment";
import { CommentT } from "../Types";
import { format } from "timeago.js";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addDislikeToComment,
  addLikeToComment,
} from "../features/commentSlice";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { fetch } from "../axiosRequest";
import { useNavigate } from "react-router-dom";

interface Props {
  comment: CommentT;
  isLoading: boolean;
}

const Comment: FC<Props> = ({ comment, isLoading }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const likeComment = async (id: string) => {
    if (!currentUser) {
      return toast.info("You should Signin first!");
    }
    try {
      await fetch.put(`/comments/like/${id}`);
      dispatch(addLikeToComment({ commentId: id, userId: currentUser._id }));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const dislikeComment = async (id: string) => {
    if (!currentUser) {
      return toast.info("You should Signin first!");
    }
    try {
      await fetch.put(`/comments/dislike/${id}`);
      dispatch(addDislikeToComment({ commentId: id, userId: currentUser._id }));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <img className="avatar" src={comment.postedBy.avatar} alt="Avatar" />
      <div className="details">
        <span className="username">
          {comment.postedBy.username}{" "}
          <span className="date"> {format(comment.createdAt)} </span>
        </span>
        <span className="text">{comment.desc}</span>
        <div className="action">
          <span className="likes" onClick={() => likeComment(comment._id)}>
            {comment?.likes?.includes(currentUser?._id!) ? (
              <AiFillLike />
            ) : (
              <AiOutlineLike />
            )}
            <span> {comment.likes?.length}</span>
          </span>
          <span className="likes" onClick={() => dislikeComment(comment._id)}>
            {comment?.dislikes?.includes(currentUser?._id!) ? (
              <AiFillDislike />
            ) : (
              <AiOutlineDislike />
            )}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Comment;

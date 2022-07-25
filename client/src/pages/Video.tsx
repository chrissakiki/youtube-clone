import React, { useEffect, useState } from "react";
import { Wrapper } from "../assets/wrappers/Video";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { BsSave, BsSaveFill } from "react-icons/bs";
import Comments from "../components/Comments";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import { fetchOneVideo, likeVideo, dislikeVideo } from "../features/vidSlice";
import { subscription, saveVid } from "../features/userSlice";
import Loading from "../components/Loading";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { fetch } from "../axiosRequest";
import Recommendations from "../components/Recommendations";

const Video = () => {
  const { id } = useParams();
  const { currentUser } = useAppSelector((state) => state.user);
  const { oneVideo, isLoading } = useAppSelector((state) => state.video);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchNewVideo = () => {
    if (id) {
      dispatch(fetchOneVideo(id));
    }
  };

  useEffect(() => {
    fetchNewVideo();
    // addView();
  }, [id]);

  // const addView = async () => {
  //   try {
  //     await fetch.put(`videos/view/${oneVideo?._id}`);
  //   } catch (error: any) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const handleLike = async () => {
    if (!currentUser) {
      return navigate("/signin");
    }
    try {
      await fetch.put(`/users/like/${oneVideo?._id}`);
      dispatch(likeVideo(currentUser?._id));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleDislike = async () => {
    if (!currentUser) {
      return navigate("/signin");
    }
    try {
      await fetch.put(`/users/dislike/${oneVideo?._id}`);
      dispatch(dislikeVideo(currentUser?._id));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const subscribe = async () => {
    if (!currentUser) {
      return navigate("/signin");
    }
    if (currentUser?.subscribedChannels?.includes(oneVideo?.postedBy._id!)) {
      try {
        await fetch.put(`users/unsubscribe/${oneVideo?.postedBy._id}`);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        await fetch.put(`users/subscribe/${oneVideo?.postedBy._id}`);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }

    dispatch(subscription(oneVideo?.postedBy._id));
  };

  const saveVideo = async () => {
    if (!currentUser) {
      return navigate("/signin");
    }
    try {
      await fetch.put(`/users/saved/${oneVideo?._id}`);
      toast.success("Video has been saved!");
      dispatch(saveVid(oneVideo?._id));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const unsaveVideo = async () => {
    if (!currentUser) {
      return navigate("/signin");
    }
    try {
      await fetch.put(`/users/unsaved/${oneVideo?._id}`);
      toast.success("Video has been removed!");
      dispatch(saveVid(oneVideo?._id));
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="content">
        <div className="video-wrapper">
          <video src={oneVideo?.videoUrl} controls></video>
        </div>

        <h1 className="title">{oneVideo?.title}</h1>

        <div className="info-container">
          <span className="info">
            {oneVideo?.views} views -{" "}
            {oneVideo?.createdAt && format(oneVideo?.createdAt)}
          </span>

          <div className="button-container">
            <div className="btn" onClick={handleLike}>
              {oneVideo?.likes?.includes(currentUser?._id!) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}

              <span className="likes">{oneVideo?.likes?.length}</span>
            </div>
            <div className="btn" onClick={handleDislike}>
              {oneVideo?.dislikes?.includes(currentUser?._id!) ? (
                <AiFillDislike />
              ) : (
                <AiOutlineDislike />
              )}{" "}
              Dislike
            </div>
            <CopyToClipboard
              text={window.location.href}
              onCopy={() => toast.success("URL Copied to clipboard")}
            >
              <div className="btn">
                <RiShareForwardLine /> Share
              </div>
            </CopyToClipboard>

            <>
              {currentUser?.saved.includes(oneVideo?._id!) ? (
                <div className="btn" onClick={unsaveVideo}>
                  {" "}
                  <BsSaveFill />
                  Save
                </div>
              ) : (
                <div className="btn" onClick={saveVideo}>
                  {" "}
                  <BsSave /> Save
                </div>
              )}
            </>
          </div>
        </div>
        <hr />

        <div className="channel">
          <div className="channel-info">
            <img className="img" src={oneVideo?.postedBy?.avatar} alt="" />

            <div className="channel-details">
              <div className="main-channel">
                <div className="dir-col">
                  <span className="channel-name">
                    {oneVideo?.postedBy?.username}
                  </span>
                  <span className="channel-counter">
                    {oneVideo?.postedBy?.subscribers} Subscribers
                  </span>
                </div>

                <>
                  {currentUser !== null &&
                  currentUser?.subscribedChannels?.includes(
                    oneVideo?.postedBy._id!
                  ) ? (
                    <button
                      className="subscribe"
                      onClick={subscribe}
                      style={{ backgroundColor: "#303030" }}
                    >
                      SUBCRIBED
                    </button>
                  ) : currentUser?._id === oneVideo?.postedBy._id ? (
                    <></>
                  ) : (
                    <button className="subscribe" onClick={subscribe}>
                      SUBCRIBE
                    </button>
                  )}
                </>
              </div>
              <p className="description">{oneVideo?.desc}</p>
            </div>
          </div>
        </div>
        <hr />
        <Comments videoId={oneVideo?._id!} />
      </div>

      <Recommendations vid={oneVideo} />
    </Wrapper>
  );
};

export default Video;

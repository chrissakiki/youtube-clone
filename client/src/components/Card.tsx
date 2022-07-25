import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/Card";
import { VideoT, User } from "../Types";
import { format } from "timeago.js";

interface Props {
  rec?: string;
  video?: VideoT;
}

const Card: FC<Props> = ({ rec, video }) => {
  return (
    <Link to={`/video/${video?._id}`}>
      <Wrapper rec={rec}>
        <img className="poster" src={video?.imgUrl} alt="" />

        <div className="details">
          <img
            className="channel"
            src={video?.postedBy?.avatar && video.postedBy.avatar}
            alt=""
          />
          <div className="text-content">
            <h1>{video?.title}</h1>
            <h2>{video?.postedBy.username}</h2>
            <div className="info">
              {video?.views} views -{" "}
              {video?.createdAt && format(video?.createdAt)}
            </div>
          </div>
        </div>
      </Wrapper>
    </Link>
  );
};

export default Card;

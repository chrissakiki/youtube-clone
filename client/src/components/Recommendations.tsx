import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "../assets/wrappers/Recommendations";
import { fetch } from "../axiosRequest";
import { VideoT } from "../Types";
import Card from "./Card";
interface Props {
  vid: VideoT | null;
}
const Recommendations: FC<Props> = ({ vid }) => {
  const [videos, setVideos] = useState<VideoT[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await fetch.get(`/videos/tags?tags=${vid?.tags}`);
        setVideos(data);
      } catch (error) {}
    };
    vid?.tags && fetchVideos();
  }, [vid?.tags]);
  return (
    <Wrapper>
      <div className="container">
        {videos.map((video) => {
          if (video._id === vid?._id) {
            return;
          }
          return (
            <React.Fragment key={video._id}>
              <Card video={video} rec="rec" />
            </React.Fragment>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Recommendations;

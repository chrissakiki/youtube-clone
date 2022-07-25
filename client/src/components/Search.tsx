import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Wrapper } from "../assets/wrappers/Search";
import { fetch } from "../axiosRequest";
import { VideoT } from "../Types";
import Card from "./Card";
import Loading from "./Loading";
const Search = () => {
  const [videos, setVideos] = useState<VideoT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { search } = useLocation();
  console.log(search);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data } = await fetch.get(`/videos/search${search}`);
        console.log(data);
        setVideos(data);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [search]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      {!loading && videos.length > 0 ? (
        videos.map((video) => (
          <React.Fragment key={video._id}>
            <Card video={video} />
          </React.Fragment>
        ))
      ) : (
        <h2>Oops, no results found </h2>
      )}
    </Wrapper>
  );
};

export default Search;

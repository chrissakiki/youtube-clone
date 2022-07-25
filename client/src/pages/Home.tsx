import { FC, useEffect } from "react";
import { Wrapper } from "../assets/wrappers/Home";
import Card from "../components/Card";
import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchVideos } from "../features/vidSlice";
import Loading from "../components/Loading";
import { useNavigate, useLocation } from "react-router-dom";
import Categories from "../components/Categories";

const Home: FC = ({}) => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  const { allVideos, isLoading } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  const type = useLocation().search.split("=")[1];

  const fetchNewVideos = () => {
    if (!currentUser && (type === "subscriptions" || type === "savedVideos")) {
      return navigate("/signin");
    }

    if (!type) {
      return dispatch(fetchVideos("random"));
    }
    dispatch(fetchVideos(type));
  };

  useEffect(() => {
    fetchNewVideos();
  }, [type]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Categories />
      <div className="container">
        {allVideos && allVideos?.length > 0 ? (
          allVideos?.map((video) => (
            <React.Fragment key={video._id}>
              <Card video={video} />
            </React.Fragment>
          ))
        ) : (
          <span className="not-found">
            {type === "subscriptions"
              ? " Subscribe to your favorite channels to see their latest videos"
              : type === "savedVideos"
              ? "You have no saved videos yet"
              : "no results were found"}
          </span>
        )}
      </div>
    </Wrapper>
  );
};

export default Home;

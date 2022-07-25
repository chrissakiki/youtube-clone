import { FC, useEffect } from "react";
import { Wrapper } from "../assets/wrappers/Menu";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { MdOutlineExplore, MdSubscriptions, MdSaveAlt } from "react-icons/md";
import { BsToggleOn } from "react-icons/bs";
import { logoutUser } from "../features/userSlice";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAppContext } from "../AppProvider";
import { useAppSelector, useAppDispatch } from "../app/hooks";
interface Props {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu: FC<Props> = ({ darkMode, setDarkMode }) => {
  const { search } = useLocation();
  const path = search.split("=")[1];
  const { show, setShow } = useAppContext();
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state) => state.user);

  const menuChange = () => {
    if (window.innerWidth > 900) {
      setShow(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", menuChange);

    return () => {
      window.removeEventListener("resize", menuChange);
    };
  }, []);
  return (
    <Wrapper className={show ? "showIcons" : ""}>
      <div className="container">
        <div className={show ? "menu-items showIcons" : "menu-items"}>
          <NavLink
            to="/?query=random"
            style={{ textDecoration: "none", color: "inerhit" }}
            className="NavLink"
          >
            <div className={path === "random" ? "item active" : "item"}>
              <AiFillHome />
              <span>Home</span>
            </div>
          </NavLink>
          <NavLink
            to="/?query=trend"
            style={{ textDecoration: "none", color: "inerhit" }}
            className="NavLink"
          >
            <div className={path === "trend" ? "item active" : "item"}>
              <MdOutlineExplore />
              <span>Explore</span>
            </div>
          </NavLink>
          <NavLink
            to="/?query=subscriptions"
            style={{ textDecoration: "none", color: "inerhit" }}
            className="NavLink"
          >
            <div className={path === "subscriptions" ? "item active" : "item"}>
              <MdSubscriptions />
              <span>Subscriptions</span>
            </div>
          </NavLink>
          <NavLink
            to="/?query=savedVideos"
            style={{ textDecoration: "none", color: "inerhit" }}
            className="NavLink"
          >
            <div className={path === "saved" ? "item active" : "item"}>
              <MdSaveAlt />
              <span>Saved</span>
            </div>
          </NavLink>
          <div className="item" onClick={() => setDarkMode(!darkMode)}>
            <BsToggleOn />
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </div>
          <hr />
        </div>

        <div className={show ? "btn-container showIcons" : "btn-container"}>
          {currentUser ? (
            <>
              <button
                className="btn-logout"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                {" "}
                <AiOutlineUser /> LOG OUT
              </button>
            </>
          ) : (
            <>
              <p> Sign in to like videos, comment, and subscribe.</p>

              <Link to="/signin">
                <button className="btn">
                  {" "}
                  <AiOutlineUser /> SIGN IN
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Menu;

import { FC, useEffect, useState, useRef } from "react";
import { AiOutlineUser, AiOutlineSearch, AiFillYoutube } from "react-icons/ai";
import { Wrapper } from "../assets/wrappers/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { useAppContext } from "../AppProvider";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import UploadVideo from "./UploadVideo";
import { changeAvatar, logoutUser } from "../features/userSlice";
import { uploadImage } from "../uploadImage";
import { toast } from "react-toastify";
import { fetch } from "../axiosRequest";
const Navbar: FC = () => {
  const navigate = useNavigate();
  const { show, setShow } = useAppContext();
  const [open, setOpen] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const userNav = useRef() as React.MutableRefObject<HTMLInputElement>;
  const ava = useRef() as React.MutableRefObject<HTMLImageElement>;
  const searchVideos = () => {
    if (!search) return;
    navigate(`/search?search_query=${search}`);
    setShowSearchBar(false);
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
      avatar && uploadImage(avatar, setResult);
    }
  };

  useEffect(() => {
    avatar && uploadImage(avatar, setResult);
  }, [avatar]);

  useEffect(() => {
    const uploadAvatardb = async () => {
      dispatch(changeAvatar(result));

      try {
        await fetch.put("/users/avatar", { avatar: result });
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    result && uploadAvatardb();
    //eslint-disable-line
  }, [result]);

  useEffect(() => {
    const close = (e: any) => {
      if (
        !userNav.current.contains(e.target) &&
        !ava.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="header">
            <GiHamburgerMenu
              className="burger"
              onClick={() => setShow(!show)}
            />
            <Link to="/">
              <div className="logo-container">
                <AiFillYoutube className="logo" />
                <span>Youtube</span>
              </div>
            </Link>
          </div>
          <div
            className={
              showSearchBar ? "input-container active" : "input-container"
            }
          >
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchVideos();
                }
              }}
            />
            <AiOutlineSearch onClick={searchVideos} />
          </div>

          <div className="right-container">
            <div
              className="search-icon-mobile"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <AiOutlineSearch />
            </div>

            {currentUser ? (
              <>
                <AiOutlineVideoCameraAdd onClick={() => setOpen(true)} />
                <img
                  src={currentUser?.avatar}
                  alt=""
                  className="avatar"
                  onClick={() => setOpenMenu(!openMenu)}
                  ref={ava}
                />
              </>
            ) : (
              <Link to="/signin">
                <button className="btn">
                  {" "}
                  <AiOutlineUser /> SIGN IN
                </button>
              </Link>
            )}
          </div>
        </div>
        {currentUser && (
          <div
            className={openMenu ? "user-navbar show" : "user-navbar"}
            ref={userNav}
          >
            <div className="top">
              <div className="left">
                <img src={currentUser?.avatar} alt="" className="avatar" />
              </div>
              <div className="right">
                <p>{currentUser?.username}</p>
                <p>{currentUser?.email}</p>
              </div>
            </div>

            <hr />

            <div className="bottom">
              <label htmlFor="avatar">
                {" "}
                <BiImageAdd /> Change Avatar
              </label>
              <input
                id="avatar"
                type="file"
                hidden
                onChange={(e) => handleAvatar(e)}
                accept="image/*"
              />
              <span
                onClick={() => {
                  dispatch(logoutUser());
                  setOpenMenu(false);
                }}
              >
                <AiOutlineUser /> Logout
              </span>
            </div>
          </div>
        )}
      </Wrapper>

      {open && <UploadVideo setOpen={setOpen} />}
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Wrapper } from "../assets/wrappers/Signin";
// import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  startLoading,
  stopLoading,
  signinPending,
  signinFulfilled,
  signinRejected,
} from "../features/userSlice";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { fetch } from "../axiosRequest";

const Signin = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.user);

  const [signIn, setSignIn] = useState<boolean>(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (signIn) {
      dispatch(signinPending());
      try {
        const { data } = await fetch.post("/auth/signin", {
          username,
          password,
        });
        dispatch(signinFulfilled(data.user));
        toast.success("Successfully logged in.");
      } catch (error: any) {
        dispatch(signinRejected());
      }
    } else {
      dispatch(startLoading());
      try {
        await fetch.post("/auth/signup", {
          email,
          username,
          password,
        });
        dispatch(stopLoading());
        toast.success("Account has been created, Please login!");
        setSignIn(!signIn);
      } catch (error: any) {
        dispatch(stopLoading());
      }
    }

    setUsername("");
    setPassword("");
    setEmail("");
  };

  const googleSignin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await fetch
          .post("/auth/googlesignin", {
            username: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
          })
          .then((res) => {
            dispatch(signinFulfilled(res.data));
          })
          .catch((error) => {});
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <Wrapper>
      <div className="container">
        <h1 className="title">{signIn ? "Sign in" : "Sign up"}</h1>

        {signIn && (
          <>
            <button onClick={googleSignin} className="btn-google">
              <FcGoogle /> Signin with Google
            </button>

            <span className="or">
              <span></span>
              <span>OR</span>
              <span></span>
            </span>
          </>
        )}

        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {!signIn && (
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleSubmit}>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="loading" />
          ) : signIn ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </button>

        <p>
          {signIn ? " Not registered yet?" : "Have an account?"}{" "}
          <span onClick={() => setSignIn(!signIn)}>
            {signIn ? "Create an account" : "Sign in"}
          </span>
        </p>
      </div>
    </Wrapper>
  );
};

export default Signin;

import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { dark, light } from "./assets/utils/Theme";
import { Wrapper } from "./assets/wrappers/App";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import Search from "./components/Search";
import { injectStore } from "./axiosRequest";
import { store } from "./app/store";

function App() {
  const { currentUser } = useAppSelector((state) => state.user);

  const [darkMode, setDarkMode] = React.useState<boolean>(true);

  useEffect(() => {
    injectStore(store);
  }, [store]);

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Wrapper>
        <Navbar />
        <div className="main">
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="layout">
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route
                  path="signin"
                  element={currentUser ? <Navigate to="/" /> : <Signin />}
                />
                <Route path="video/:id" element={<Video />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

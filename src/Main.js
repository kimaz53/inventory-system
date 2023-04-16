import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "../src/logo.png";
import "@fontsource/inter";
import { AiOutlineDashboard, AiOutlineBars } from "react-icons/ai";
import { Route, Routes, Navigate } from "react-router-dom";
import Activities from "./pages/Activities";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import NoStock from "./pages/subpages/NoStock";
import OverStock from "./pages/subpages/OverStock";
import { IoFileTrayOutline, IoFileTrayFullOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { useSelector } from "react-redux";
import CustomLink from "./pages/CustomLink";

function Main() {
  const [contentWrapperHeight, setContentWrapperHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const contentWrapperHeight = windowHeight * 0.9;
      setContentWrapperHeight(contentWrapperHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLoggedIn = useSelector((state) => state.isLogin);

  return (
    <>
      {isLoggedIn === true ? (
        <div className="canvas">
          <div
            className="content-wrapper"
            style={{ height: contentWrapperHeight }}
          >
            <div className="nav-wrapper">
              <div className="logo-wrapper">
                <img src={logo} className="app-logo" alt="logo" />
                <h1>Store.</h1>
              </div>
              <div className="menu-wrapper">
                <h1>Menu</h1>
                <div className="db-wrapper">
                  <div className="db-wrapper">
                    <div className="btn-container">
                      <CustomLink
                        to="/dashboard"
                        icon={(isActive) =>
                          isActive ? (
                            <AiOutlineDashboard color="#47A515" size="1.5vw" />
                          ) : (
                            <AiOutlineDashboard color="#A6A6A6" size="1.5vw" />
                          )
                        }
                      >
                        Dashboard
                      </CustomLink>
                    </div>

                    <div className="btn-container">
                      <CustomLink
                        to="/products"
                        icon={(isActive) =>
                          isActive ? (
                            <AiOutlineBars color="#47A515" size="1.5vw" />
                          ) : (
                            <AiOutlineBars color="#A6A6A6" size="1.5vw" />
                          )
                        }
                      >
                        Products
                      </CustomLink>
                    </div>

                    <div>
                      <div className="btn-container">
                        <CustomLink
                          to="/products/nostock"
                          icon={(isActive) =>
                            isActive ? (
                              <IoFileTrayOutline color="#47A515" size="1.5vw" />
                            ) : (
                              <IoFileTrayOutline color="#A6A6A6" size="1.5vw" />
                            )
                          }
                        >
                          Out of Stock
                        </CustomLink>
                      </div>

                      <div className="btn-container">
                        <CustomLink
                          to="/products/overstock"
                          icon={(isActive) =>
                            isActive ? (
                              <IoFileTrayFullOutline
                                color="#47A515"
                                size="1.5vw"
                              />
                            ) : (
                              <IoFileTrayFullOutline
                                color="#A6A6A6"
                                size="1.5vw"
                              />
                            )
                          }
                        >
                          Overstocked
                        </CustomLink>
                      </div>
                    </div>

                    <div className="btn-container">
                      <CustomLink
                        to="/activities"
                        icon={(isActive) =>
                          isActive ? (
                            <CiCalendar
                              color="#47A515"
                              size="1.5vw"
                              strokeWidth={0.5}
                            />
                          ) : (
                            <CiCalendar
                              color="#A6A6A6"
                              size="1.5vw"
                              strokeWidth={0.5}
                            />
                          )
                        }
                      >
                        Activities
                      </CustomLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-wrapper">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/error" replace />} />
                <Route path="/products/nostock" element={<NoStock />} />
                <Route path="/products/overstock" element={<OverStock />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Main;

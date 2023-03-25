import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "../src/logo.png";
import "@fontsource/inter";
import {
  AiOutlineDashboard,
  AiOutlineBars,
  AiOutlineCalendar,
} from "react-icons/ai";
import {
  Link,
  useMatch,
  useResolvedPath,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Activities from "./pages/Activities";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import NoStock from "./pages/subpages/NoStock";
import OverStock from "./pages/subpages/OverStock";

function Main() {
  const [contentWrapperHeight, setContentWrapperHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const contentWrapperHeight = windowHeight * 0.9;
      setContentWrapperHeight(contentWrapperHeight);
    };

    handleResize(); // initial call to set the height

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="canvas">
      <div className="content-wrapper" style={{ height: contentWrapperHeight }}>
        <div className="nav-wrapper">
          <div className="logo-wrapper">
            <img src={logo} className="app-logo" alt="logo" />
            <h1>Store.</h1>
          </div>
          <div className="menu-wrapper">
            <h1>Menu</h1>
            <div className="db-wrapper">
              <div className="db-wrapper">
                <div
                  style={{ flexDirection: "column" }}
                  className="btn-container"
                >
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
                <div className="btn-container">
                  <CustomLink
                    to="/activities"
                    icon={(isActive) =>
                      isActive ? (
                        <AiOutlineCalendar color="#47A515" size="1.5vw" />
                      ) : (
                        <AiOutlineCalendar color="#A6A6A6" size="1.5vw" />
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
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/error" replace />} />
            <Route path="/dashboard/nostock" element={<NoStock />} />
            <Route path="/dashboard/overstock" element={<OverStock />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function CustomLink({ to, icon, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: null });

  return (
    <li className={ isActive ?  "active" : ""}>
      <div className="link-wrapper">
        {icon(isActive)}
        <Link to={to} {...props}>
          {children}
        </Link>
      </div>
      {isActive && <div className="rectangle" />}
    </li>
  );
}

export default Main;

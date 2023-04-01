import "../App.css";
import { Link } from "react-router-dom";
import bags from "../../src/bags.png";
import boxes from "../../src/boxes.png";
import emptyboxes from "../../src/emptybox.png";
import {
  IoSearchOutline,
  IoPersonCircleOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { useState } from "react";

export default function Dashboard() {
  const [notifData, setNotifData] = useState(0);

  return (
    <div className="stock-container">
      <div
        style={{ padding: "0vw 2vw 4vw 2vw" }}
        className="product-nav-wrapper"
      >
        <div style={{ marginBottom: "-2vw" }} className="desc-nav">
          <h1>Hello, Good Day.</h1>
          <p>Welcome back!</p>
        </div>

        <div style={{ marginRight: "3.5vw" }} className="search-wrapper">
          <input
            type="text"
            id="myInput"
            placeholder="Search"
            className="search-input"
          />
          <IoSearchOutline className="search-icon" color="#7E7E7E" size="2vw" />
        </div>
        <div
          style={{ marginRight: "1vw", flexDirection: "column" }}
          className="filter-btn"
        >
          {notifData > 0 ? null : <div className="notifBall"/>}
          <IoNotificationsOutline color="#7E7E7E" size="2vw" />
        </div>

        <div className="filter-btn">
          <IoPersonCircleOutline color="#7E7E7E" size="2vw" />
        </div>
      </div>

      <div className="cards-container">
        <div className="parent-div">
          <div className="sub-parent">
            <div className="title-txt">
              <p>Count of all</p>
              <p>products</p>
            </div>
            <div className="data-txt">
              <h1>99</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={bags} className="bags-data-img" alt="logo" />
            <Link className="more-products-btn" to="/dashboard/nostock">
              More
            </Link>
          </div>
        </div>

        <div className="parent-div">
          <div className="sub-parent">
            <div className="title-txt">
              <p>Products Out </p>
              <p>of Stock</p>
            </div>
            <div className="data-txt">
              <h1>0</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={emptyboxes} className="bags-data-img" alt="logo" />
            <Link className="more-products-btn" to="/dashboard/overstock">
              More
            </Link>
          </div>
        </div>

        <div className="parent-div">
          <div className="sub-parent">
            <div className="title-txt">
            <p>Products</p>
            <p>Overstock</p>
            </div>
            <div className="data-txt">
              <h1>150</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={boxes} className="bags-data-img" alt="logo" />
            <Link className="more-products-btn" to="/overstock">
              More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

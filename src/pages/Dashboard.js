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
import { useState, useEffect } from "react";
import ColorThief from "colorthief";

export default function Dashboard() {
  const [data, setData] = useState([
    {
      title: "Item 1",
      image:
        "https://media.istockphoto.com/id/1215792210/photo/homemade-purple-japanese-ube-ice-cream.jpg?s=612x612&w=0&k=20&c=mKmF0NSxC7mIVIhY3VHGa4nY9xsXuXXtP6P5xaxJ7Rk=",
      stocks: 73,
      unread: true,
    },
    {
      title: "Item 2",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      stocks: 62,
      unread: false,
    },
    {
      title: "Item 3",
      image:
        "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      stocks: 70,
      unread: false,
    },
    {
      title: "Item 4",
      image:
        "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
      stocks: 55,
      unread: false,
    },
    {
      title: "Item 5",
      image:
        "https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      stocks: 58,
      unread: true,
    },
    {
      title: "Item 6",
      image:
        "https://plus.unsplash.com/premium_photo-1676037839664-6f52faa56a81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      stocks: 51,
      unread: true,
    },
    {
      title: "Item 7",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      stocks: 60,
      unread: true,
    },
    // more data items...
  ]);

  const [notifData, setNotifData] = useState(0);
  const [dominantColors, setDominantColors] = useState([]);

  useEffect(() => {
    const colorThief = new ColorThief();
    const promises = data.map((item) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = item.image;
        img.onload = () => {
          const color = colorThief.getColor(img);
          const dominantColor = `rgb(${color}, 0.4)`;
          resolve({ dominantColor });
        };
      });
    });

    Promise.all(promises).then((colors) => {
      const dominantColors = colors.map((color) => color.dominantColor);
      setDominantColors(dominantColors);
    });
  }, []);

  const [unreadItems, setUnreadItems] = useState();

  useEffect(() => {
    let count = 0;
    data.forEach((item) => {
      if (item.unread) {
        count++;
      }
    });
    setUnreadItems(count);
  }, [data]);

  const handleMarkAllAsRead = () => {
    setUnreadItems(0);
    setData((prevData) =>
      prevData.map((item) => {
        return {
          ...item,
          unread: false,
        };
      })
    );
  };

  const handleItemClick = (index) => {
    const newData = [...data];
    newData[index] = { ...newData[index], unread: false };
    setData(newData);
  };

  return (
    <div className="stock-container">
      <div className="notification-container">
        <h1 style={{ color: "#7E7E7E" }}>Notifications</h1>
        <div className="notif-btns">
          <button className="all-btn">All</button>
          <button className="unread-btn">
            {unreadItems > 0 ? `Unread (${unreadItems})` : "Unread"}
          </button>
          <Link className="mark-all-btn" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Link>
        </div>

        <div className="item-container">
          {data.map((item, index) => (
            <div
              style={{ backgroundColor: dominantColors[index] }}
              className="item-wrap"
              key={index}
              onClick={() => handleItemClick(index)}
            >
              <img className="image-size" src={item.image} alt={item.title} />
              <div className="item-txt">
                <p style={{ color: "#5D5353" }}>{item.title}</p>
                <p style={{ color: "#1F99DD", fontWeight: "600" }}>
                  {item.stocks} stocks available
                </p>
              </div>
              {item.stocks > 0 && item.unread && (
                <div className="unread-circle"></div>
              )}
            </div>
          ))}
        </div>
      </div>

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
          {unreadItems === 0 ? null : <div className="notifBall" />}
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
            <Link className="more-products-btn" to="/products">
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
            <Link className="more-products-btn" to="/dashboard/nostock">
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
            <Link className="more-products-btn" to="/dashboard/overstock">
              More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

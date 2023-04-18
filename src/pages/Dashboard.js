import "../App.css";
import { Link } from "react-router-dom";
import bags from "../../src/bags.png";
import boxes from "../../src/boxes.png";
import emptyboxes from "../../src/emptybox.png";
import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoCloseCircleOutline,
  IoFileTray,
  IoFileTrayFull,
  IoLogOut,
  IoChevronForwardSharp,
} from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import ColorThief from "colorthief";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const userImage = useSelector((state) => state.user_image);

  const [profileClicked, setProfileClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      const intervalId = setInterval(() => {
        fetchData();
      }, 15000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/products/items/stocks"
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [items, setItems] = useState([]);
  const outOfStock = items.filter((item) => item.remaining_stocks === 0).length;
  const overStock = items.filter((item) => item.remaining_stocks > 50).length;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products/items");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  const navigate = useNavigate();

  function handleProfileClick() {
    setProfileClicked(!profileClicked);
  }

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
  }, [data]);

  useEffect(() => {
    let count = 0;
    data.forEach((item) => {
      if (item.unread) {
        count++;
      }
    });
    setUnreadItems(count);
  }, [data]);

  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleMarkAllAsRead = async () => {
    setUnreadOnly(false);
    try {
      await axios.put("http://localhost:3001/read");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemClick = async (id) => {
    dispatch({ type: "SET_SELECTED_ITEM_ID", payload: id });
    setSelectedItemId(id);
    try {
      await axios.put("http://localhost:3001/products/items/stocks/" + id);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedItemId) {
      const selectedItem = data.find((item) => item.id === selectedItemId);
      if (selectedItem) {
        if (selectedItem.stocks > 0) {
          navigate("/products/overstock");
        } else {
          navigate("/products/nostock");
        }
      }
    }
  }, [selectedItemId, data, navigate]);

  const handleAllClick = () => {
    setUnreadOnly(false);
    setFilteredData(data);
  };

  const handleUnreadClick = () => {
    setUnreadOnly(true);
    const filtered = data.filter((item) => item.unread === 1);
    setFilteredData(filtered);
  };

  const [unreadItems, setUnreadItems] = useState(
    data.filter((item) => item.unread).length
  );

  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("mousedown", handler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
    };
  });

  const profileButtonRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        !profileButtonRef.current.contains(e.target)
      ) {
        setProfileClicked(false);
      }
    };

    document.body.addEventListener("mousedown", handler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
    };
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNotifBallClick = () => {
    setIsOpen(!isOpen);
    setProfileClicked(!profileClicked);
  };

  return (
    <div className="stock-container">
      {profileClicked && (
        <div ref={profileRef} className="profile-wrapper">
          <div className="wrap-profile">
            <div className="profile-btn-container">
              <div
                style={{ marginTop: "1vw", marginLeft: "1vw" }}
                className="image-wrapper"
              >
                <img
                  style={{ height: "8vw", width: "4vw", objectFit: "cover" }}
                  src={userImage}
                  alt=""
                />
              </div>
              <div
                style={{
                  margin: "0",
                  height: "0.1vw",
                  backgroundColor: "#B5B5B5",
                  marginLeft: "1vw",
                  width: "20.7vw",
                  marginTop: "1vw",
                }}
              ></div>
              <div
                style={{ marginTop: "1vw", marginLeft: "1vw" }}
                className="manage-products-link"
              >
                <div
                  ref={ref}
                  style={{
                    fontSize: "1vw",
                    color: "#FFFFFF",
                    marginTop: "7.5vw",
                    marginRight: "1.5vw",
                    width: "1.2vw",
                    height: "1.2vw",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                  className="notifBall"
                  onClick={handleNotifBallClick}
                >
                  {data.length}
                </div>
                <p onClick={() => navigate("/products")}>
                  Manage your products
                </p>
              </div>
            </div>
          </div>

          <div className="btns-wrap">
            <div
              className="profile-links"
              onClick={() => navigate("/products/nostock")}
            >
              <div className="icon-container">
                <IoFileTray color="#5D5353" size="1.5vw" />
              </div>
              <p>Check Out of Stocks</p>
              <IoChevronForwardSharp
                style={{ marginLeft: "8vw" }}
                color="#5D5353"
                size="1.5vw"
              />
              <div className="profile-links-bg-color" />
            </div>
            <div
              className="profile-links"
              onClick={() => navigate("/products/overstock")}
            >
              <div className="icon-container">
                <IoFileTrayFull color="#5D5353" size="1.5vw" />
              </div>
              <p>Check Over Stocks</p>
              <IoChevronForwardSharp
                style={{ marginLeft: "8.7vw" }}
                color="#5D5353"
                size="1.5vw"
              />
              <div className="profile-links-bg-color" />
            </div>
            <div className="profile-links" onClick={() => navigate("/login")}>
              <div className="icon-container">
                <IoLogOut color="#5D5353" size="1.5vw" />
              </div>
              <p>Log Out</p>
              <div className="profile-links-bg-color" />
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div>
          <div className="notification-container" ref={ref}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <h1 style={{ color: "#7E7E7E" }}>Notifications</h1>
              <IoCloseCircleOutline
                onClick={handleToggle}
                className="close-notif"
                color="#7E7E7E"
                size="2.5vw"
              />
            </div>

            <div className="notif-btns">
              <button
                onClick={handleAllClick}
                className="all-btn"
                style={{
                  backgroundColor: !unreadOnly ? "#47A515" : "#F2F2F2",
                }}
                selectedid={selectedItemId}
              >
                All
              </button>
              <button
                onClick={handleUnreadClick}
                className="unread-btn"
                style={{
                  backgroundColor: unreadOnly ? "#47A515" : "#F2F2F2",
                }}
              >
                {unreadItems > 0 ? `Unread (${unreadItems})` : "Unread"}
              </button>
              <Link className="mark-all-btn" onClick={handleMarkAllAsRead}>
                Mark All as Read
              </Link>
            </div>

            <div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "1vw",
                  justifyContent: "flex-start",
                  marginLeft: "2vw",
                }}
                className="legend-container"
              >
                <div stylye={{ color: "#5D5353" }} className="legend">
                  Legend:
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="blue" />
                  <div
                    style={{ color: "#1F99DD", marginLeft: "0.5vw" }}
                    className="legend"
                  >
                    Overstock
                  </div>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="red" />
                  <div
                    style={{ color: "#DD1F58", marginLeft: "0.5vw" }}
                    className="legend"
                  >
                    Out of Stock
                  </div>
                </div>
              </div>
            </div>

            <div className="grid-items">
              {filteredData.length === 0 && (
                <div className="caught-up-message">
                  <p>You're All Caught Up.</p>
                </div>
              )}
              {filteredData.map((item, index) => (
                <div
                  style={{
                    backgroundColor:
                      dominantColors[
                        data.findIndex((items) => items.id === item.id)
                      ],
                  }}
                  className="item-wrap"
                  key={index}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="notif-item-image">
                    <img
                      style={{
                        height: "5vw",
                        width: "5vw",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className="item-txt">
                    <p style={{ color: "#5D5353" }}>{item.title}</p>
                    <p
                      style={{
                        color: item.stocks > 0 ? "#1F99DD" : "#DD1F58",
                      }}
                    >
                      {item.stocks} stocks available
                    </p>
                  </div>
                  {item.unread === 1 && <div className="unread-circle"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
          ref={buttonRef}
          style={{ marginRight: "1vw", flexDirection: "column" }}
          className="filter-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {unreadItems === 0 ? null : <div className="notifBall" />}
          <IoNotificationsOutline color="#7E7E7E" size="2vw" />
        </div>

        <div
          ref={profileButtonRef}
          className="filter-btn"
          onClick={handleProfileClick}
        >
          <div className="image-wrapper">
            <img
              style={{ height: "8vw", width: "4vw", objectFit: "cover" }}
              src={userImage}
              alt=""
            />
          </div>
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
              <h1>{items.length}</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={bags} className="cards-data-img" alt="logo" />
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
              <h1>{outOfStock}</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={emptyboxes} className="cards-data-img" alt="logo" />
            <Link className="more-products-btn" to="/products/nostock">
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
              <h1>{overStock}</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={boxes} className="cards-data-img" alt="logo" />
            <Link className="more-products-btn" to="/products/overstock">
              More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

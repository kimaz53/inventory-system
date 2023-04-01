import "../../App.css";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBackOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import ColorThief from "colorthief";
import { useState, useEffect } from "react";
import noData from "../../../src/noData.png";

const data1 = []

const data = [
  {
    title: "Item 1",
    image:
      "https://media.istockphoto.com/id/1215792210/photo/homemade-purple-japanese-ube-ice-cream.jpg?s=612x612&w=0&k=20&c=mKmF0NSxC7mIVIhY3VHGa4nY9xsXuXXtP6P5xaxJ7Rk=",
    stocks: 0,
  },
  {
    title: "Item 2",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    stocks: 0,
  },
  {
    title: "Item 3",
    image:
      "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    stocks: 0,
  },
  {
    title: "Item 4",
    image:
      "https://images.unsplash.com/photo-1499195333224-3ce974eecb47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
    stocks: 0,
  },
  {
    title: "Item 5",
    image:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stocks: 0,
  },
  {
    title: "Item 6",
    image:
      "https://plus.unsplash.com/premium_photo-1676037839664-6f52faa56a81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    stocks: 0,
  },
  {
    title: "Item 7",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stocks: 0,
  },
  // more data items...
];

export default function NoStock() {
  const navigate = useNavigate();
  const [dominantColors, setDominantColors] = useState([]);
  const [qty, setQty] = useState(0);

  const handleQtyChange = (value) => {
    setQty(qty + value);
  };

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

  return (
    <div className="stock-container">
      <div className="stock-content-wrapper">
        <div onClick={() => navigate(-1)} className="back-btn">
          <IoChevronBackOutline color="#FFFFFF" size="2vw" />
        </div>
        <div style={{ marginLeft: "1vw" }}>
          <h1 style={{ color: "#7E7E7E" }}>Products out of Stock</h1>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="no-data">
          <img src={noData} className="no-data-img" alt="logo" />
          <p>No products here.</p>
        </div>
      ) : (
        <div className="grid-wrapper">
          <div className="grid">
            {data.map((item, index) => (
              <div
                key={index}
                className="grid-item"
                style={{
                  backgroundColor: dominantColors[index],
                }}
              >
                <div className="image-container">
                  <img src={item.image} alt={item.title} className="image" />
                </div>
                <div className="bottom-container">
                  <div className="items-container">
                    <h2>{item.title}</h2>
                    <p
                      style={{
                        color: "#DD1F1F",
                      }}
                    >
                      {item.stocks} Stocks Left
                    </p>
                  </div>
                  <div className="operation-container">
                    <div
                      onClick={() => handleQtyChange(-1)}
                      className="minus-btns"
                    >
                      <IoRemoveOutline color="#FFFFFF" size="30px" />
                    </div>
                    <div className="value-container">
                      <input
                        type="number"
                        className="qty-field"
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                      />
                      <div className="underline"></div>
                    </div>
                    <div
                      onClick={() => handleQtyChange(1)}
                      className="plus-btns"
                    >
                      <IoAddOutline color="#FFFFFF" size="30px" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

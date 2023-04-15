import "../../App.css";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBackOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import ColorThief from "colorthief";
import { useState, useEffect, useRef } from "react";
import noData from "../../../src/noData.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateOverStock } from "../../redux/store";

export default function OverStock() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataz);

  const navigate = useNavigate();
  const [dominantColors, setDominantColors] = useState([]);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/products/items/stocks"
        );
        dispatch(updateOverStock(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [dispatch]);

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

  const selectedItemId = useSelector((state) => state.selectedItemId);
  const [selectedItem, setSelectedItem] = useState(selectedItemId);

  const handleQtyChanges = (itemId, value) => {
    setQty(qty + value);
    setSelectedItem(itemId);
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleMouseDown = async (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelectedItem(null);
        dispatch({
          type: "SET_SELECTED_ITEM_ID",
          payload: null,
        });
        try {
          if (
            window.confirm(
              "Are you sure you want to update this item's stocks?"
            )
          ) {
            await axios.put(
              `http://localhost:3001/products/stocks/update/${selectedItem}`,
              {
                remainingStocks: qty,
              }
            );

            window.location.reload();
          }
          setQty(0);
        } catch (err) {
          console.log(err);
        }
      }
    };
    document.body.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.body.removeEventListener("mousedown", handleMouseDown);
    };
  }, [setSelectedItem, dispatch, qty, selectedItem]);

  const handleSetSelectedItemId = (id) => {
    setQty(data.find((item) => item.id === id).stocks);
    setSelectedItem(id);
    dispatch({
      type: "SET_SELECTED_ITEM_ID",
      payload: id,
    });
  };

  return (
    <div className="stock-container">
      {selectedItem &&
        data.find((item) => item.id === selectedItem && item.stocks > 50) && (
          <>
            <div className="selected-item-container">
              <div className="selected-item" ref={ref}>
                <div
                  className="selected-wrap"
                  style={{
                    backgroundColor:
                      dominantColors[
                        data.findIndex((item) => item.id === selectedItem)
                      ],
                  }}
                >
                  <img
                    src={data.find((item) => item.id === selectedItem).image}
                    alt={data.find((item) => item.id === selectedItem).title}
                    className="selected-image"
                  />

                  <div className="bottom-wrap">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <h2>
                        {data.find((item) => item.id === selectedItem).title}
                      </h2>
                      <p style={{ color: "#1F82DD", margin: "0" }}>
                        {data.find((item) => item.id === selectedItem).stocks}{" "}
                        Stocks Left
                      </p>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      className="operation-containers"
                    >
                      <div
                        onClick={() => handleQtyChanges(selectedItem, 1)}
                        className="plus-btnss"
                      >
                        <IoAddOutline color="#FFFFFF" size="30px" />
                      </div>
                      <div className="value-container">
                        <input
                          type="number"
                          className="qty-fields"
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value))}
                        />
                        <div className="underline"></div>
                      </div>
                      <div
                        onClick={() => handleQtyChanges(selectedItem, -1)}
                        className="minus-btnss"
                      >
                        <IoRemoveOutline color="#FFFFFF" size="30px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      <div className="stock-content-wrapper">
        <div onClick={() => navigate("/dashboard")} className="back-btn">
          <IoChevronBackOutline color="#FFFFFF" size="2vw" />
        </div>
        <div style={{ marginLeft: "1vw" }}>
          <h1 style={{ color: "#7E7E7E" }}>Products overstocked</h1>
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
            {data.map((item, index) =>
              item.stocks > 50 ? (
                <div
                  key={index}
                  className="grid-item"
                  style={{
                    backgroundColor: dominantColors[index],
                  }}
                  onClick={() => handleSetSelectedItemId(item.id)}
                >
                  <div className="image-container">
                    <img src={item.image} alt={item.title} className="image" />
                  </div>
                  <div className="bottom-container">
                    <div className="items-container">
                      <div>
                        <h2>{item.title}</h2>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#1F82DD",
                          }}
                        >
                          {item.stocks} Stocks Left
                        </p>
                      </div>
                    </div>
                    <div className="operation-container">
                      <div
                        onClick={() => handleQtyChanges(selectedItem, -1)}
                        className="minus-btns"
                      >
                        <IoRemoveOutline color="#FFFFFF" size="30px" />
                      </div>
                      {selectedItemId === item.id ? (
                        <div className="value-container">
                          <input
                            type="number"
                            className="qty-fields"
                            value={qty}
                            onChange={(e) => setQty(parseInt(e.target.value))}
                          />

                          <div className="underline"></div>
                        </div>
                      ) : (
                        <div className="value-container">
                          <input
                            type="number"
                            className="qty-fields"
                            value={item.stocks}
                            onChange={(e) => setQty(parseInt(e.target.value))}
                          />

                          <div className="underline"></div>
                        </div>
                      )}
                      <div
                        onClick={() => handleQtyChanges(selectedItem, 1)}
                        className="plus-btns"
                      >
                        <IoAddOutline color="#FFFFFF" size="30px" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

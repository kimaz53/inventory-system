import "../App.css";
import ProductsTable from "./subpages/ProductsTable";
import History from "./subpages/History";

import React, { useState, useEffect, useRef } from "react";
import {
  IoSearchOutline,
  IoCloudUploadOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";

export default function Products() {
  const [showHistory, setShowHistory] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Products");

  const handleProductsClick = (tabName) => {
    setSelectedTab(tabName);
    setShowProducts(true);
    setShowHistory(false);
  };

  const handleHistoryClick = (tabName) => {
    setSelectedTab(tabName);
    setShowProducts(false);
    setShowHistory(true);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [openFilter, setOpenFilter] = useState(false);

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked = false } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const clearSelected = () => {
    setCheckedItems({});
  };

  const selectedItems = Object.keys(checkedItems).filter(
    (item) => checkedItems[item]
  );

  const checkboxes = [
    { name: "Fresh Produce", key: "checkbox1", id: 1 },
    { name: "Dairy", key: "checkbox2", id: 2 },
    { name: "Meat", key: "checkbox3", id: 3 },
    { name: "Bakery", key: "checkbox4", id: 4 },
    { name: "Snacks and Packaged Food", key: "checkbox5", id: 5 },
    { name: "Beverages", key: "checkbox6", id: 6 },
    { name: "Frozen Food", key: "checkbox7", id: 7 },
    { name: "Personal Care", key: "checkbox8", id: 8 },
    { name: "Cleaning Supplies", key: "checkbox9", id: 9 },
    { name: "Miscellaneous", key: "checkbox10", id: 10 },
  ];

  const handleClickFilter = () => {
    setOpenFilter(!openFilter);
  };

  const buttonRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenFilter(false);
      }
    };

    document.body.addEventListener("mousedown", handler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="product-container">
      {openFilter && (
        <div ref={ref} className="filter-container">
          <div className="checkbox-items-container">
            {checkboxes.map((item) => (
              <div key={item.id}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={checkedItems[item.name] || false}
                    onChange={handleChange}
                    className="check"
                  />
                  <span
                    style={{
                      color: checkedItems[item.name] ? "#47A515" : "#7E7E7E",
                      marginLeft: "1vw",
                      fontSize: "1vw",
                    }}
                  >
                    {item.name}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="product-nav-wrapper">
        <div
          className={`product-nav-btn ${
            selectedTab === "Products" ? "active" : ""
          }`}
          onClick={() => handleProductsClick("Products")}
        >
          <h1>Products</h1>
          {selectedTab === "Products" && <div className="rectangle"></div>}
        </div>
        <div
          className={`product-nav-btn ${
            selectedTab === "History" ? "active" : ""
          }`}
          onClick={() => handleHistoryClick("History")}
        >
          <h1>History</h1>
          {selectedTab === "History" && <div className="rectangle"></div>}
        </div>

        <div className="search-wrapper">
          <input
            type="text"
            id="myInput"
            placeholder="Search"
            className="search-input"
            value={inputValue}
            onChange={handleInputChange}
          />
          <IoSearchOutline className="search-icon" color="#7E7E7E" size="2vw" />
        </div>

        <div
          ref={buttonRef}
          className="filter-btn"
          onClick={() => setOpenFilter(!openFilter)}
        >
          <BiFilterAlt color="#7E7E7E" size="2vw" />
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="selected-items-container">
          <div className="selected-filter-container">
            <div className="selected-filter">
              {selectedItems.slice(0, 4).map((item) => (
                <div
                  key={item}
                  className="item-filter-container"
                  onClick={() =>
                    handleChange({ target: { name: item, checked: false } })
                  }
                >
                  <div className="item-filter">
                    {item} <div className="close-btn">X</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="more-filter-container">
            <div className="more-filter-btn">
              {selectedItems.length > 4 && (
                <div onClick={handleClickFilter}>
                  +{selectedItems.length - 4} more
                </div>
              )}
            </div>
            <div className="clear-all-filter-btn" onClick={clearSelected}>
              Clear All
            </div>
          </div>
        </div>
      )}

      <div className="add-item-wrapper">
        <p>Add a Product</p>
        <div className="item-code-wrapper">
          <input
            type="text"
            id="myInput"
            placeholder="Code..."
            className="add-item-input"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <div className="item-code-wrapper">
          <input
            type="text"
            id="myInput"
            placeholder="Item..."
            className="add-item-input"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <div className="item-wrapper-btn">
          <p>Image</p>
          <IoCloudUploadOutline color="#5D5353" size="2vw" />
        </div>

        <div className="item-wrapper-btn">
          <p>Category</p>
          <IoChevronDownOutline color="#5D5353" size="2vw" />
        </div>

        <div className="item-qty-wrapper">
          <input
            type="text"
            id="myInput"
            placeholder="Qty..."
            className="add-item-qty-input"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <div className="add-btn">Add</div>
      </div>

      <div className="main-product-wrapper">
        {showProducts ? <ProductsTable /> : null}
        {showHistory ? <History /> : null}
      </div>
    </div>
  );
}

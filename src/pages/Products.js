import "../App.css";
import ProductsTable from "./subpages/ProductsTable";
import History from "./subpages/History";

import React, { useState } from "react";
import {
  IoSearchOutline,
  IoFilterOutline,
  IoCloudUploadOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

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

  return (
    <div className="product-container">
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

        <div className="filter-btn">
          <IoFilterOutline color="#7E7E7E" size="2vw" />
        </div>
      </div>

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

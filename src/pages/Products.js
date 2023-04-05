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
import CheckboxList from "./CheckboxList";
import SelectedItemsContainer from "./SelectedItemsContainer";
import RadioList from "./RadioList";

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

  const [selectedRadioItem, setSelectedRadioItem] = useState("");

  const handleRadioChanges = (e) => {
    setSelectedRadioItem(e.target.value);
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

  const filterBtn = useRef(null);
  const filterContainer = useRef(null);

  const categoryBtn = useRef(null);
  const categoryContainer = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        filterContainer.current &&
        !filterContainer.current.contains(e.target) &&
        !filterBtn.current.contains(e.target)
      ) {
        setOpenFilter(false);
      }
    };

    document.body.addEventListener("mousedown", handler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    let handler = (e) => {
      if (
        categoryContainer.current &&
        !categoryContainer.current.contains(e.target) &&
        !categoryBtn.current.contains(e.target)
      ) {
        setOpenCategory(false);
      }
    };

    document.body.addEventListener("mousedown", handler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
    };
  });

  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className="product-container">
      {openFilter && (
        <div ref={filterContainer} className="filter-container">
          <CheckboxList
            checkboxes={checkboxes}
            checkedItems={checkedItems}
            handleChange={handleChange}
          />
        </div>
      )}

      {openCategory && (
        <div ref={categoryContainer} className="radio-container">
          <RadioList
            checkboxes={checkboxes}
            selectedRadioItem={selectedRadioItem}
            handleRadioChanges={handleRadioChanges}
          />
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
          ref={filterBtn}
          className="filter-btn"
          onClick={() => setOpenFilter(!openFilter)}
        >
          <BiFilterAlt color="#7E7E7E" size="2vw" />
        </div>
      </div>

      {selectedItems.length > 0 && (
        <SelectedItemsContainer
          selectedItems={selectedItems}
          handleChange={handleChange}
          handleClickFilter={handleClickFilter}
          clearSelected={clearSelected}
        />
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
          <IoCloudUploadOutline color="#5D5353" size="2.5vw" />
        </div>

        <div
          ref={categoryBtn}
          className="item-wrapper-btn"
          onClick={() => setOpenCategory(!openCategory)}
        >
          <p>{selectedRadioItem || "Category"}</p>

          <IoChevronDownOutline color="#5D5353" size="2.5vw" />
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

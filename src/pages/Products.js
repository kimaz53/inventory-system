import "../App.css";
import ProductsTable from "./subpages/ProductsTable";
import History from "./subpages/History";
import React, { useState, useEffect, useRef } from "react";
import {
  IoSearchOutline,
  IoCloudUploadOutline,
  IoChevronDownOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";
import CheckboxList from "./CheckboxList";
import SelectedItemsContainer from "./SelectedItemsContainer";
import RadioList from "./RadioList";
import axios from "axios";

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
  const [selectedRadioItem, setSelectedRadioItem] = useState("");

  const [items, setItems] = useState({
    product_image: "",
    item_code: null,
    item_name: "",
    category: "",
    qty: null,
  });

  const handleInputChange = (e) => {
    setItems((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [searchResult, setSearchResult] = useState("");

  const handleSearchResultChange = (event) => {
    setSearchResult(event.target.value);
  };

  const handleRadioChanges = (e) => {
    setSelectedRadioItem(e.target.value);
    setItems((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nullVariables = Object.keys(items).filter(
      (key) => items[key] === null
    );

    if (nullVariables.length > 0) {
      window.alert(`Please fill in all fields before submitting.`);
      return;
    }

    try {
      if (window.confirm("Are you sure you want to add this Item?")) {
        await axios.post("https://inventory-db-api-request.onrender.com/items", items);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [openFilter, setOpenFilter] = useState(false);

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked = false } = event.target;
    if (checked) {
      setCheckedItems({ ...checkedItems, [name]: checked });
    } else {
      const { [name]: omit, ...rest } = checkedItems;
      setCheckedItems(rest);
    }
  };

  const clearSelected = () => {
    setCheckedItems({});
    window.location.reload();
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

  const [openImageInput, setOpenImageInput] = useState(false);

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

      {openImageInput && (
        <div className="image-input-container">
          <input
            type="text"
            name="product_image"
            placeholder="Image Link..."
            className="add-itemLink-input"
            value={items.product_image || ""}
            onChange={handleInputChange}
          />
          <div className="img-link-btns">
            <div onClick={() => setOpenImageInput(!openImageInput)}>
              <IoCheckmarkOutline
                style={{ border: "0.2vw solid #47A515" }}
                color="#47A515"
                size="2vw"
              />
            </div>
          </div>
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
            value={searchResult}
            onChange={handleSearchResultChange}
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

      <div className="add-item-wrapper">
        <p>Add a Product</p>
        <div className="item-code-wrapper">
          <input
            type="number"
            id="myInput"
            placeholder="Code..."
            className="add-item-input"
            name="item_code"
            onChange={handleInputChange}
          />
        </div>

        <div className="item-code-wrapper">
          <input
            type="text"
            id="myInput"
            placeholder="Title..."
            className="add-itemName-input"
            name="item_name"
            onChange={handleInputChange}
          />
        </div>

        <div
          className="item-wrapper-btn"
          onClick={() => setOpenImageInput(!openImageInput)}
        >
          <p>{items.product_image || "Image"}</p>
          <IoCloudUploadOutline color="#5D5353" size="2.5vw" />
        </div>

        <div
          ref={categoryBtn}
          className="item-wrapper-btn"
          onClick={() => setOpenCategory(!openCategory)}
          name="category"
          onChange={handleInputChange}
        >
          <p>{selectedRadioItem || "Category"}</p>

          <IoChevronDownOutline color="#5D5353" size="2.5vw" />
        </div>

        <div className="item-qty-wrapper">
          <input
            type="number"
            id="myInput"
            placeholder="Qty..."
            className="add-item-qty-input"
            name="qty"
            onChange={handleInputChange}
          />
        </div>

        <div className="add-btn" onClick={handleSubmit}>
          Add
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

      <div className="main-product-wrapper">
        {showProducts ? (
          <ProductsTable
            checkedItems={checkedItems}
            searchResult={searchResult}
          />
        ) : null}
        {showHistory ? (
          <History checkedItems={checkedItems} searchResult={searchResult} />
        ) : null}
      </div>
    </div>
  );
}

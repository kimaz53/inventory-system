import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  IoSearchOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import ProductsTable from "./subpages/ProductsTable";
import { BiFilterAlt } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import CheckboxList from "./CheckboxList";
import SelectedItemsContainer from "./SelectedItemsContainer";

export default function Activities() {
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
          <CheckboxList
            checkboxes={checkboxes}
            checkedItems={checkedItems}
            handleChange={handleChange}
          />
        </div>
      )}
      <div className="product-nav-wrapper">
        <div style={{ marginBottom: "-2vw" }} className="desc-nav">
          <h1>Hello, Good Day!</h1>
          <p>This is your stocks so far.</p>
        </div>

        <div style={{ marginRight: "3.5vw" }} className="search-wrapper">
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
        <div style={{ marginRight: "1vw" }} className="filter-btn">
          <CiCalendar color="#7E7E7E" size="2vw" strokeWidth={0.5} />
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
        <SelectedItemsContainer
          selectedItems={selectedItems}
          handleChange={handleChange}
          handleClickFilter={handleClickFilter}
          clearSelected={clearSelected}
        />
      )}

      <div className="calendar-btns">
        <div className="prev-next-btn">
          <div className="prev-btn">
            <IoChevronBackOutline color="#FFFFFF" size="2vw" />
          </div>
          <div className="next-btn">
            <IoChevronForwardOutline color="#FFFFFF" size="2vw" />
          </div>
          <div style={{ marginLeft: "1vw" }} className="today-btn">
            <p>Today</p>
          </div>
        </div>

        <div className="date-wrapper">
          <h1>April 1-30, 2023</h1>
        </div>

        <div className="month-week-day">
          <div className="month-btn">Month</div>
          <div className="week-btn">Week</div>
          <div className="day-btn">Day</div>
        </div>
      </div>

      <ProductsTable />
    </div>
  );
}

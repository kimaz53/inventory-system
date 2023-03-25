import "../App.css";
import React, { useState } from "react";
import {
  IoSearchOutline,
  IoFilterOutline,
  IoCalendarOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import ProductsTable from "./subpages/ProductsTable";

export default function Activities() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="product-container">
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
          <IoCalendarOutline color="#7E7E7E" size="2vw" />
        </div>

        <div className="filter-btn">
          <IoFilterOutline color="#7E7E7E" size="2vw" />
        </div>
      </div>

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

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

export default function Activities() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const buttonRef = useRef(null);
  const ref = useRef(null);

  const [filterOpen, setFilterOpen] = useState(false);

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

  const [checkedItemss, setCheckedItemss] = useState({});

  const handleChangess = (event) => {
    const { name, checked = false } = event.target;
    setCheckedItemss({ ...checkedItemss, [name]: checked });
  };

  useEffect(() => {
    let handler = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setFilterOpen(false);
      }
    };

    document.body.addEventListener("mousedown", handler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
    };
  });

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked = false } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  const clearSelected = () => {
    setCheckedItemss({});
  };

  const selectedItems = Object.keys(checkedItemss).filter(
    (item) => checkedItemss[item]
  );

  return (
    <div className="product-container">
      {filterOpen && (
        <div ref={ref} className="filter-container">
          <div className="checkbox-items-container">
            {checkboxes.map((item) => (
              <div key={item.id}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={checkedItemss[item.name] || false}
                    onChange={handleChangess}
                    className="check"
                  />
                  <span
                    style={{
                      color: checkedItemss[item.name] ? "#47A515" : "#7E7E7E",
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
          onClick={() => setFilterOpen(!filterOpen)}
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
                    handleChangess({ target: { name: item, checked: false } })
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
                <div onClick={() => setFilterOpen(!filterOpen)}>
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

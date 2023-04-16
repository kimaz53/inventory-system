import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  IoSearchOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { BiFilterAlt } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import CheckboxList from "./CheckboxList";
import SelectedItemsContainer from "./SelectedItemsContainer";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import History from "./subpages/History";

export default function Activities() {
  const [searchResult, setSearchResult] = useState("");

  const handleSearchResultChange = (event) => {
    setSearchResult(event.target.value);
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

  const calendarButtonRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    let handler = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        !calendarButtonRef.current.contains(e.target)
      ) {
        setOpenCalendar(false);
      }
    };

    document.body.addEventListener("mousedown", handler);
    return () => {
      document.body.removeEventListener("mousedown", handler);
    };
  });

  const [openCalendar, setOpenCalendar] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  function getTodayDateRange() {
    setSelectedButton("today");
    const today = new Date();
    return [
      {
        startDate: today,
        endDate: today,
        key: "selection",
      },
    ];
  }

  function handlePrevNextClick(offset) {
    const { startDate, endDate } = dateRange[0];
    let newStartDate, newEndDate;

    switch (dateRange[0].type) {
      case "month":
        newStartDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + offset,
          1
        );
        newEndDate = new Date(
          newStartDate.getFullYear(),
          newStartDate.getMonth() + 1,
          0
        );
        break;
      case "week":
        newStartDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + offset * 7
        );
        newEndDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + offset * 7
        );
        break;
      case "day":
      default:
        newStartDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + offset
        );
        newEndDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + offset
        );
        setSelectedButton("day");
        break;
    }

    setDateRange([
      {
        startDate: newStartDate,
        endDate: newEndDate,
        type: dateRange[0].type,
        key: "selection",
      },
    ]);
  }

  function handleDateRangeClick(rangeType) {
    setSelectedButton(rangeType);
    const today = new Date();
    let startDate, endDate;

    switch (rangeType) {
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "week":
        const weekStart = today.getDate() - today.getDay();
        const weekEnd = weekStart + 6;
        startDate = new Date(today.getFullYear(), today.getMonth(), weekStart);
        endDate = new Date(today.getFullYear(), today.getMonth(), weekEnd);
        break;
      case "day":
      default:
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        endDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        break;
    }

    setDateRange([
      {
        startDate,
        endDate,
        type: rangeType,
        key: "selection",
      },
    ]);
  }

  const [selectedButton, setSelectedButton] = useState("today");

  return (
    <div className="product-container">
      {openCalendar && (
        <div ref={calendarRef} className="date-picker">
          <DateRangePicker
            className="calendar"
            ranges={dateRange}
            onChange={handleDateChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            rangeColors={["#47A515", "#47A515", "#47A515"]}
          />
        </div>
      )}

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
            value={searchResult}
            onChange={handleSearchResultChange}
          />
          <IoSearchOutline className="search-icon" color="#7E7E7E" size="2vw" />
        </div>

        <div
          ref={calendarButtonRef}
          style={{ marginRight: "1vw" }}
          className="filter-btn"
          onClick={() => setOpenCalendar(!openCalendar)}
        >
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

      <div className="calendar-btns">
        <div className="prev-next-btn">
          <div className="prev-btn" onClick={() => handlePrevNextClick(-1)}>
            <IoChevronBackOutline color="#FFFFFF" size="2vw" />
          </div>
          <div className="next-btn" onClick={() => handlePrevNextClick(1)}>
            <IoChevronForwardOutline color="#FFFFFF" size="2vw" />
          </div>
          <div
            style={{ marginLeft: "1vw" }}
            className={`today-btn ${
              selectedButton === "today" ? "selected" : ""
            }`}
            onClick={() => setDateRange(getTodayDateRange())}
          >
            <p>Today</p>
          </div>
        </div>

        <div className="date-wrapper">
          <h1>
            {dateRange[0]?.startDate?.toLocaleDateString()} -{" "}
            {dateRange[0]?.endDate?.toLocaleDateString()}
          </h1>
        </div>

        <div className="month-week-day">
          <div
            className={`month-btn ${
              selectedButton === "month" ? "selected" : ""
            }`}
            onClick={() => handleDateRangeClick("month")}
          >
            Month
          </div>
          <div
            className={`week-btn ${
              selectedButton === "week" ? "selected" : ""
            }`}
            onClick={() => handleDateRangeClick("week")}
          >
            Week
          </div>
          <div
            className={`day-btn ${selectedButton === "day" ? "selected" : ""}`}
            onClick={() => handleDateRangeClick("day")}
          >
            Day
          </div>
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

      <History checkedItems={checkedItems} searchResult={searchResult} />
    </div>
  );
}

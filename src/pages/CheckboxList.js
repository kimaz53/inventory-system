import React from "react";

function CheckboxList({ checkboxes, checkedItems, handleChange }) {
  return (
    <div className="radio-items-container">
      {checkboxes.map((item) => (
        <div key={item.id} className="radio-item-container">
          <label>
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
  );
}

export default CheckboxList;

import React from "react";

function RadioList({ checkboxes, selectedRadioItem, handleRadioChanges }) {
  return (
    <div className="radio-items-container">
      {checkboxes.map((item) => (
        <div key={item.id} className="radio-item-container">
          <label>
            <input
              type="radio"
              name="radioOption"
              value={item.name}
              checked={selectedRadioItem === item.name}
              onChange={handleRadioChanges}
              className="radio-select"
            />
            <span
              style={{
                color: selectedRadioItem === item.name ? "#47A515" : "#7E7E7E",
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

export default RadioList;

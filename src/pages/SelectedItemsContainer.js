import React from "react";

function SelectedItemsContainer({
  selectedItems,
  handleChange,
  handleClickFilter,
  clearSelected,
}) {
  return (
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
  );
}

export default SelectedItemsContainer;

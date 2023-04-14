import React from "react";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const EditableRow = ({ items, handleInputChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" id={`checkbox-${items.item_code}`} />
      </td>
      <td>{formatDate(items.date_updated)}</td>
      <td>
        <input
          className="edit-row"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="item_code"
          value={items.item_code}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          className="edit-row"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="item_code"
          value={items.item}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          className="edit-row"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="item_code"
          value={items.category}
          onChange={handleInputChange}
        />
      </td>
      <td>{items.yesterday_stocks}</td>
      <td>
        <input
          className="edit-row"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="item_code"
          value={items.remaining_stocks}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;

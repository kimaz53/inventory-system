import React from "react";
import axios from "axios";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const EditableRow = ({ item, handleInputChange, handleCancelClick }) => {
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/items/` + item.product_id, item);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(item);

  return (
    <tr>
      <td>
        <input type="checkbox" id={`checkbox-${item.item_code}`} />
      </td>
      <td>{formatDate(item.date_updated)}</td>
      <td>
        <input
          className="edit-row"
          type="number"
          required="required"
          placeholder="Enter a code..."
          name="item_code"
          value={item.item_code}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          className="edit-row"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="item"
          value={item.item}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          className="edit-row"
          type="text"
          required="required"
          placeholder="Enter a category..."
          name="category"
          value={item.category}
          onChange={handleInputChange}
        />
      </td>
      <td>{item.yesterday_stocks}</td>
      <td>
        <input
          className="edit-row"
          type="number"
          required="required"
          placeholder="Enter remaining stocks..."
          name="remaining_stocks"
          value={item.remaining_stocks}
          onChange={handleInputChange}
        />
      </td>
      <td>
        <button type="submit" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;

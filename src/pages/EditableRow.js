import React from "react";
import axios from "axios";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import "../App.css";

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

  return (
    <tr>
      <td>{formatDate(item.date_updated)}</td>
      <td>
        <input
          className="edit-row"
          type="number"
          required="required"
          placeholder="Code..."
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
          placeholder="Title..."
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
          placeholder="Category..."
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
          placeholder="Qty..."
          name="remaining_stocks"
          value={item.remaining_stocks}
          onChange={handleInputChange}
        />
      </td>
      <td className="action-btns">
        <IoCheckmarkOutline onClick={handleSave} color="#47A515" size="1.5vw" />
        <IoCloseOutline
          onClick={handleCancelClick}
          color="#DD1F58"
          size="1.5vw"
        />
      </td>
    </tr>
  );
};

export default EditableRow;

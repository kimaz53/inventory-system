import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import "../App.css";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const ReadOnlyRow = ({ item, handleEdit, handleDelete }) => {
  return (
    <tr>
      <td>{formatDate(item.date_updated)}</td>
      <td>{item.item_code}</td>
      <td>{item.item}</td>
      <td>{item.category}</td>
      <td>{item.yesterday_stocks}</td>
      <td>{item.remaining_stocks}</td>
      <td className="action-btns">
        <BiEditAlt
          onClick={(e) => handleEdit(e, item)}
          color="#47A515"
          size="1.5vw"
        />
        <AiOutlineDelete
          onClick={() => handleDelete(item.product_id)}
          color="#DD1F58"
          size="1.5vw"
        />
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

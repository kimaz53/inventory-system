import React from "react";

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
      <td>
        <input type="checkbox" id={`checkbox-${item.item_code}`} />
      </td>
      <td>{formatDate(item.date_updated)}</td>
      <td>{item.item_code}</td>
      <td>{item.item}</td>
      <td>{item.category}</td>
      <td>{item.yesterday_stocks}</td>
      <td>{item.remaining_stocks}</td>
      <td>
        <button type="button" onClick={(e) => handleEdit(e, item)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDelete(item.product_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;

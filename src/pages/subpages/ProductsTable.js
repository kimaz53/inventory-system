import "../../App.css";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ReadOnlyRow from "../ReadOnlyRow";
import EditableRow from "../EditableRow";

export default function ProductsTable({ checkedItems, searchResult }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products/items");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/items/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      handleDelete(id);
    }
  };

  const [editItemsId, setEditItemsId] = useState(null);

  const [editItem, setEditItem] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (event, item) => {
    event.preventDefault();
    setEditItem(item);
    setEditItemsId(item.item_code);
  };

  const handleCancelClick = (e) => {
    setEditItemsId(null);
  };

  return (
    <div className="table-container">
      <div>
        <table className="table">
          <thead>
            <tr className="tr-tbl">
              <th>Product Image</th>
              <th>Date Updated</th>
              <th>Item Code</th>
              <th>Item</th>
              <th>Category</th>
              <th>Yesterday's Stocks</th>
              <th>Remaining Stocks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(checkedItems).length === 0
              ? items
                  .filter((item) => {
                    const values = Object.values(item).map((value) =>
                      value.toString().toLowerCase()
                    );
                    return values.some((value) =>
                      value.includes(searchResult.toLowerCase())
                    );
                  })
                  .map((item) => (
                    <Fragment key={item.item_code}>
                      {editItemsId === item.item_code ? (
                        <EditableRow
                          item={editItem}
                          handleInputChange={handleInputChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          item={item}
                          handleEdit={handleEdit}
                          confirmDelete={confirmDelete}
                        />
                      )}
                    </Fragment>
                  ))
              : items
                  .filter((item) => checkedItems[item.category])
                  .filter((item) => {
                    const values = Object.values(item).map((value) =>
                      value.toString().toLowerCase()
                    );
                    return values.some((value) =>
                      value.includes(searchResult.toLowerCase())
                    );
                  })
                  .map((item) => (
                    <Fragment key={item.item_code}>
                      {editItemsId === item.item_code ? (
                        <EditableRow
                          item={editItem}
                          handleInputChange={handleInputChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          item={item}
                          handleEdit={handleEdit}
                          confirmDelete={confirmDelete}
                        />
                      )}
                    </Fragment>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

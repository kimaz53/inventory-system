import "../../App.css";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ReadOnlyRow from "../ReadOnlyRow";
import EditableRow from "../EditableRow";

export default function ProductsTable() {
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

  const [editItems, setEditItems] = useState({
    product_image: "",
    item_code: null,
    item_name: "",
    category: "",
    qty: null,
  });

  const handleInputChange = (e) => {
    setItems((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(editItems);

  const [editItemsId, setEditItemsId] = useState(null);

  const handleEdit = (event, items) => {
    event.preventDefault();
    setEditItemsId(items.item_code);

    const formValues = {
      product_image: items.product_image,
      item_code: items.item_code,
      item_name: items.item,
      category: items.category,
      yesterday_stocks: items.yesterday_stocks,
      remaining_stocks: items.remaining_stocks,
    };

    setEditItems(formValues);
  };

  const handleCancelClick = (e) => {
    setEditItemsId(0)
  };

  return (
    <div className="table-container">
      <div>
        <table className="table">
          <thead>
            <tr className="tr-tbl">
              <td>
                <input type="checkbox" id="checkbox" />
              </td>
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
            {items.map((item) => (
              <Fragment key={item.item_code}>
                {editItemsId === item.item_code ? (
                  <EditableRow
                    items={item}
                    handleInputChange={handleInputChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    item={item}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
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

import React from "react";
import "../../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import noData from "../../noData.png";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function History({ checkedItems, searchResult }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "https://inventory-db-api-request.onrender.com/products/items/history"
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  const filteredData =
    Object.keys(checkedItems).length === 0
      ? data.filter((item) => {
          const values = Object.values(item).map((value) =>
            value.toString().toLowerCase()
          );
          return values.some((value) =>
            value.includes(searchResult.toLowerCase())
          );
        })
      : data
          .filter((item) => checkedItems[item.category])
          .filter((item) => {
            const values = Object.values(item).map((value) =>
              value.toString().toLowerCase()
            );
            return values.some((value) =>
              value.includes(searchResult.toLowerCase())
            );
          });

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
              <th>Quantity</th>
              <th>Operation Description</th>
              <th>Stocks Before</th>
              <th>Stocks After</th>
              <th>Total Stocks</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  style={{
                    height: "50vh",
                    verticalAlign: "top",
                    paddingTop: "2.5vw",
                  }}
                >
                  <div className="no-datas">
                    <img src={noData} className="no-datas-img" alt="logo" />
                    <p>No products here.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                
                <tr key={item.id}>
                  <td className="item-img-container">
                    <img className="item-img" src={item.product_image} alt="" />
                  </td>
                  <td>{formatDate(item.date_updated)}</td>
                  <td>{item.item_code}</td>
                  <td>{item.item}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.operation_desc}</td>
                  <td>{item.stocks_before}</td>
                  <td>{item.stocks_after}</td>
                  <td>{item.total_stocks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

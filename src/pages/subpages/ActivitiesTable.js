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

export default function ActivitiesTable({
  checkedItems,
  searchResult,
  dateRange,
}) {
  const [data, setData] = useState([]);

  const startDate = formatDate(dateRange[0].startDate);
  const endDate = formatDate(dateRange[0].endDate);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `https://inventory-db-api-request.onrender.com/users/products/items/activities?startDate=${startDate}&endDate=${endDate}`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [startDate, endDate]);

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
            const values = [item.item_code, item.item, item.category].map(
              (value) => value.toString().toLowerCase()
            );
            return values.some((value) =>
              value.includes(searchResult.toLowerCase())
            );
          })
          .filter((item, index, arr) => {
            return (
              index ===
              arr.findIndex((elem) => elem.item_code === item.item_code)
            );
          })
          .filter((item) => {
            const itemDate = formatDate(item.date_updated);
            return itemDate >= startDate && itemDate <= endDate;
          });

  const groupedData = filteredData.reduce((groups, item) => {
    const code = item.item_code;
    if (!groups[code]) {
      groups[code] = {
        item: item,
        duplicates: [],
      };
    } else {
      groups[code].duplicates.push(item);
    }
    return groups;
  }, {});

  const uniqueData = Object.values(groupedData).map((group) => group.item);

  const filteredUniqueData =
    Object.keys(checkedItems).length === 0
      ? uniqueData.filter((item) => {
          const values = Object.values(item).map((value) =>
            value.toString().toLowerCase()
          );
          return values.some((value) =>
            value.includes(searchResult.toLowerCase())
          );
        })
      : uniqueData
          .filter((item) => checkedItems[item.category])
          .filter((item) => {
            const values = Object.values(item).map((value) =>
              value.toString().toLowerCase()
            );
            return values.some((value) =>
              value.includes(searchResult.toLowerCase())
            );
          })
          .filter((item) => {
            const itemDate = formatDate(item.date_updated);
            return itemDate >= startDate && itemDate <= endDate;
          });

  const [expandedRows, setExpandedRows] = useState({});

  const handleRowClick = (rowId) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  return (
    <div className="table-wrapper">
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
            {filteredUniqueData.length === 0 ? (
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
              filteredUniqueData.map((item) => (
                <React.Fragment key={item.item_code}>
                  <tr
                    onClick={() => handleRowClick(item.item_code)}
                    className={expandedRows[item.item_code] ? "expanded" : ""}
                  >
                    <td className="item-img-container">
                      <img
                        className="item-img"
                        src={item.product_image}
                        alt=""
                      />
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

                  {expandedRows[item.item_code] && (
                    <>
                      {filteredData
                        .filter(
                          (filteredItem) =>
                            filteredItem.item_code === item.item_code
                        )
                        .map((filteredItem, index) => (
                          <React.Fragment key={filteredItem.id}>
                            <>
                              {index > 0 && (
                                <tr style={{ backgroundColor: "#DCDCDC" }}>
                                  <td className="item-img-container">
                                    <img
                                      className="item-img"
                                      src={filteredItem.product_image}
                                      alt=""
                                    />
                                  </td>
                                  <td>
                                    {formatDate(filteredItem.date_updated)}
                                  </td>
                                  <td>{filteredItem.item_code}</td>
                                  <td>{filteredItem.item}</td>
                                  <td>{filteredItem.category}</td>
                                  <td>{filteredItem.quantity}</td>
                                  <td>{filteredItem.operation_desc}</td>
                                  <td>{filteredItem.stocks_before}</td>
                                  <td>{filteredItem.stocks_after}</td>
                                  <td>{filteredItem.total_stocks}</td>
                                </tr>
                              )}
                            </>
                          </React.Fragment>
                        ))}

                      <tr>
                        <td colSpan="10" style={{ backgroundColor: "#DCDCDC" }}>
                          --- End of Items. ---
                        </td>
                      </tr>
                    </>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

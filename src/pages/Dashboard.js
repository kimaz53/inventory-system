import "../App.css";
import { Link } from "react-router-dom";
import bags from "../../src/bags.png";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <Link to="/products">All Products</Link>
        <Link to="/dashboard/nostock">Products out of Stock</Link>
        <Link to="/dashboard/overstock">Products overstocked</Link>
      </div>

      <div className="cards-container">
        <div className="parent-div">
          <div className="sub-parent">
            <div className="title-txt">
              <p>Count of all</p>
              <p>products</p>
            </div>
            <div className="data-txt">
              <h1>123</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={bags} className="bags-data-img" alt="logo" />
            <Link className="more-products-btn" to="/products">
              More
            </Link>
          </div>
        </div>

        <div className="parent-div">
          <div className="sub-parent">
            <div className="title-txt">
              <p>Count of all</p>
              <p>products</p>
            </div>
            <div className="data-txt">
              <h1>123</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={bags} className="bags-data-img" alt="logo" />
            <Link className="more-products-btn" to="/products">
              More
            </Link>
          </div>
        </div>

        <div className="parent-div">
          <div className="sub-parent">
            <div className="title-txt">
              <p>Count of all</p>
              <p>products</p>
            </div>
            <div className="data-txt">
              <h1>123</h1>
            </div>
          </div>

          <div className="image-and-button">
            <img src={bags} className="bags-data-img" alt="logo" />
            <Link className="more-products-btn" to="/products">
              More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
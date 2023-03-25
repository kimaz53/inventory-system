import "../../App.css";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export default function NoStock() {
  const navigate = useNavigate();

  return (
    <div className="stock-container">
      <div className="stock-content-wrapper">
        <div onClick={() => navigate(-1)} className="back-btn">
          <IoChevronBackOutline color="#FFFFFF" size="2vw" />
        </div>
        <div style={{ marginLeft: "1vw" }}>
          <h1 style={{ color: "#7E7E7E" }}>Products out of stock</h1>
        </div>
      </div>
    </div>
  );
}

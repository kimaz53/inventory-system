import "../../App.css";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export default function OverStock() {
  const navigate = useNavigate();

  return (
    <div className="overstock-container">
      <div className="overstock-content-wrapper">
        <div onClick={() => navigate(-1)} className="back-btn">
          <IoChevronBackOutline color="#FFFFFF" size="2vw" />
        </div>
        <div style={{ marginLeft: "1vw" }}>
          <h1 style={{ color: "#7E7E7E" }}>Products overstocked</h1>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <Link to="/dashboard/nostock">Products out of Stock</Link>
        <Link to="/dashboard/overstock">Products overstocked</Link>
      </div>
    </div>
  );
}

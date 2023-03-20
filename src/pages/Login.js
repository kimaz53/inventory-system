import "../App.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-wrapper">
      <Link to="/dashboard">Login</Link>
    </div>
  );
}

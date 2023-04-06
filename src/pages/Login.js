import "../App.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-wrapper">
      <h5>Authorized Personel only. Please sign-in first!</h5>
      <br></br>
      <div>
        <label>Username: </label>
        <input type="text" name ="uname" placeholder ="type your username here" />
        <br></br>
        <label>Password: </label>
        <input type="password" name ="pword" placeholder ="type your password here" />
      </div>
      <Link to="/dashboard">Login</Link>
    </div>
  );
}

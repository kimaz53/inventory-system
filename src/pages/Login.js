import "../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin() {
    const username = document.getElementsByName("uname")[0].value;
    const password = document.getElementsByName("pword")[0].value;

    dispatch({ type: "LOGIN", payload: { username, password } });

    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    }
  }

  return (
    <div className="login-wrapper">
      <h5>Authorized Personel only. Please sign-in first!</h5>
      <br></br>
      <div>
        <label>Username: </label>
        <input type="text" name="uname" placeholder="type your username here" />
        <br></br>
        <label>Password: </label>
        <input
          type="password"
          name="pword"
          placeholder="type your password here"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

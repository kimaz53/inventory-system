import "../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch({ type: "LOGOUT" });
  }, [dispatch]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  function handleLogin() {
    const username = document.getElementsByName("uname")[0].value;
    const password = document.getElementsByName("pword")[0].value;

    const user = data.find(
      (user) => user.username === username && user.password === password
    );

    const user_image = user.user_image;

    if (user) {
      dispatch({ type: "LOGIN", payload: { user_image, username, password } });

      navigate("/dashboard");
    } else {
      console.log("Invalid username or password");
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

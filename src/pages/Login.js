import "../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoWarningOutline } from "react-icons/io5";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { BsFillExclamationCircleFill } from "react-icons/bs";

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

  const [isValid, setIsValid] = useState(true);

  function handleLogin() {
    const username = document.getElementsByName("uname")[0].value;
    const password = document.getElementsByName("pword")[0].value;

    const user = data.find(
      (user) => user.username === username && user.password === password
    );

    if (username.trim() === "" || password.trim() === "") {
      window.alert("Enter credentials. Check empty fields and Try again.");
      return;
    }

    if (user) {
      const user_image = user.user_image;
      dispatch({ type: "LOGIN", payload: { user_image, username, password } });

      navigate("/dashboard");
    } else {
      setIsValid(false);
    }
  }

  const loginBtnRef = useRef(null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    loginBtnRef.current.focus();
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-wrapper">
      <div className="login-title">
        <div className="warning-svg">
          <IoWarningOutline size={25} color={"#FF9900"} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="warning-desc">
            <p>Authorized Personnel Only. Please Sign-In first!</p>
          </div>
        </div>
      </div>

      <div className="login-container">
        <div className="uname-wrapper">
          <label className="uname-lbl">Username</label>
          <input
            className={`uname-input ${!isValid && "invalid-input"}`}
            type="text"
            name="uname"
            placeholder="Type your username here"
          />
        </div>

        <div className="pword-wrapper">
          <div className="pword-top">
            <label className="pword-lbl">Password</label>
            {passwordVisible ? (
              <VscEyeClosed
                className="pword-show-hide"
                size={20}
                color={"#000000"}
                onClick={handlePasswordVisibility}
              />
            ) : (
              <VscEye
                className="pword-show-hide"
                size={20}
                color={"#000000"}
                onClick={handlePasswordVisibility}
              />
            )}
          </div>

          <input
            className={`pword-input ${!isValid && "invalid-input"}`}
            type={passwordVisible ? "text" : "password"}
            name="pword"
            placeholder="Type your password here"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>

        <div
          className="login-btn"
          onClick={handleLogin}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        >
          <p>Login</p>
        </div>
      </div>
      {!isValid && (
        <div className="invalid-credentials">
          <BsFillExclamationCircleFill size={20} color={"#DD1F58"} />
          <p style={{ color: "#DD1F58" }}>
            Wrong credentials. Check your inputs and Try again.
          </p>
        </div>
      )}
    </div>
  );
}

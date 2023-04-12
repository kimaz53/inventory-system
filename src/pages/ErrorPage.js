import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Error_Page() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        navigate(-1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, navigate]);

  return (
    <div className="error-page-wrapper">
      <h1>PAGE DOES NOT EXIST!</h1>
      <div className="redirect-timer">
        <p>Redirecting you back in {secondsLeft} seconds...</p>
      </div>
    </div>
  );
}

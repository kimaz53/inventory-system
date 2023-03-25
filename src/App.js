import "./App.css";
import "@fontsource/inter";

import { BrowserRouter } from "react-router-dom";

import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;

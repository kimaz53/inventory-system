import "./App.css";
import "@fontsource/inter";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const storedIsLogin = localStorage.getItem("isLogin");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["selectedItemId", "data", "dataz"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {
  selectedItemId: null,
  username: "",
  password: "",
  isLogin: storedIsLogin === "true",
  data: [],
  dataz: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_ITEM_ID":
      return { ...state, selectedItemId: action.payload };
    case "LOGIN":
      localStorage.setItem("isLogin", "true");
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        isLogin: true,
      };
    case "SET_NO_STOCK_DATA":
      return { ...state, data: action.payload };
    case "SET_OVER_STOCK_DATA":
      return { ...state, dataz: action.payload };
    case "LOGOUT":
      localStorage.removeItem("isLogin");
      return {
        ...state,
        username: "",
        password: "",
        isLogin: false,
      };
    case "STAY":
      return {
        ...state,
        isLogin: true,
      };

    default:
      return state;
  }
}

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export const updateData = (newData) => {
  return {
    type: "SET_NO_STOCK_DATA",
    payload: newData,
  };
};

export const updateOverStock = (newData) => {
  return {
    type: "SET_OVER_STOCK_DATA",
    payload: newData,
  };
};

export { store, persistor };

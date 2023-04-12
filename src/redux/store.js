import { createStore } from "redux";

const storedIsLogin = localStorage.getItem("isLogin");
const initialState = {
  selectedItemId: 0,
  username: "",
  password: "",
  isLogin: storedIsLogin === "true",
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

const store = createStore(rootReducer);

export default store;

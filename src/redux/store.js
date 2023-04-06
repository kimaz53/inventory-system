import { createStore } from "redux";

const initialState = {
  selectedItemId: 0,
  username: "",
  password: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_ITEM_ID":
      return { ...state, selectedItemId: action.payload };
    case "LOGIN":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;

import { createStore } from "redux";

const initialState = {
  selectedItemId: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_ITEM_ID":
      return { ...state, selectedItemId: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;

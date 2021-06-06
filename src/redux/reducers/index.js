// Global
import { combineReducers } from "redux";
// Reducers
import indexReducer from "./index.reducer";

const reducers = combineReducers({
  indexReducer,
});

const appReducer = (state, action) => {
  if (action.type === "RESET") {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

export default appReducer;

import { combineReducers } from "redux";
import uiReducer from "../slices/uiSlice";
import userEntriesReducer from "../slices/userEntriesSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  userEntries: userEntriesReducer,
});

export default rootReducer;

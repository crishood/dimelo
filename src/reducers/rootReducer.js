import { combineReducers } from "redux";
import uiReducer from "../slices/uiSlice";
import userEntriesReducer from "../slices/userEntriesSlice";
import usersReducer from "../slices/usersSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  userEntries: userEntriesReducer,
  users: usersReducer,
});

export default rootReducer;

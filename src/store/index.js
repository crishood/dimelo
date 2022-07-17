import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/User.reducer";

const rootReducer = combineReducers({
  userReducer,
});

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);

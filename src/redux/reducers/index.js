import { combineReducers } from "redux";
import { courseReducer } from "./courseReducers";
import { authorReducer } from "./authorReducers";
import { apiCallStatusReducer } from "./apiStatusReducers";

const allReducers = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallsInProgress: apiCallStatusReducer,
});

export default allReducers;

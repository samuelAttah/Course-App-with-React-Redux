import * as constants from "../actions/ActionTypes";
import initialState from "./initialState";

export const authorReducer = (state = initialState.authors, action) => {
  switch (action.type) {
    case constants.LOAD_AUTHORS_SUCCESS:
      return action.payLoad;
    default:
      return state;
  }
};

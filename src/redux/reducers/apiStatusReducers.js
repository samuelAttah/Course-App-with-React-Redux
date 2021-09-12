import initialState from "./initialState";
import * as constants from "../actions/ActionTypes";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export const apiCallStatusReducer = (
  state = initialState.apiCallsInProgress,
  action
) => {
  if ((action.type = constants.BEGIN_API_CALL)) {
    return state + 1;
  } else if (
    action.type === constants.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  {
    return state;
  }
};

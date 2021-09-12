import * as constants from "./ActionTypes";

export const beginApiCall = () => {
  return { type: constants.BEGIN_API_CALL };
};

export const apiCallError = () => {
  return { type: constants.API_CALL_ERROR };
};

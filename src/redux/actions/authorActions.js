import * as constants from "./ActionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export const loadAuthorsSuccess = (authors) => {
  return { type: constants.LOAD_AUTHORS_SUCCESS, payLoad: authors };
};

export const loadAuthors = () => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
};

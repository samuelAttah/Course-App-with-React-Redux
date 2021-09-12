import * as constants from "../actions/ActionTypes";
import initialState from "./initialState";
export const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case constants.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.payLoad }];
    case constants.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.payLoad.id ? action.payLoad : course
      );
    case constants.LOAD_COURSES_SUCCESS:
      return action.payLoad;
    case constants.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.payLoad);
    default:
      return state;
  }
};

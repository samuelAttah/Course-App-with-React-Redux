import * as constants from "./ActionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export const loadCoursesSuccess = (courses) => {
  return { type: constants.LOAD_COURSES_SUCCESS, payLoad: courses };
};

export const createCourseSuccess = (course) => {
  return { type: constants.CREATE_COURSE_SUCCESS, payLoad: course };
};

export const updateCourseSuccess = (course) => {
  return { type: constants.UPDATE_COURSE_SUCCESS, payLoad: course };
};

export const deleteCourseOptimistic = (course) => {
  return { type: constants.DELETE_COURSE_OPTIMISTIC, payLoad: course };
};

export const loadCourses = () => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
};

export const saveCourse = (course) => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
};

export const deleteCourse = (course) => {
  return function (dispatch) {
    // Here Optimistic delete was done.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
};

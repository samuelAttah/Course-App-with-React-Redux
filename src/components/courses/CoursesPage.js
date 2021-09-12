import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const CoursesPage = ({ courses, authors, actions }) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading Courses Failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading Authors Failed" + error);
      });
    }
  }, []);

  const handleDelete = async (course) => {
    toast.success("Course Successfully Deleted");
    setTimeout(() => setIsDeleted(true), 2000);
    try {
      await actions.deleteCourse(course);
    } catch (error) {
      toast.error("Failed to Delete Course" + error.message, {
        autoClose: false,
      });
    }
  };

  return (
    <>
      {isDeleted ? window.location.reload() : null}
      {redirectToAddCoursePage && <Redirect to="/course/" />}
      <h2>Courses</h2>
      {authors.length === 0 || courses.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>

          <CourseList courses={courses} onDeleteClick={handleDelete} />
        </>
      )}
    </>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
};

const mapStateToProps = (state) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

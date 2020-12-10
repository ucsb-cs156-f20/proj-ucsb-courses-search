import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";

import CourseSearchFormQtrDeptOnly from "main/components/BasicCourseSearch/CourseSearchFormQtrDeptOnly";
import CourseSearchFormInstructor from "main/components/BasicCourseSearch/CourseSearchFormInstructor";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import {  fetchBasicCourseHistoryJSON } from "main/services/courseSearches";
import {  fetchInstructorHistoryNameQtrJSON } from "main/services/courseSearches";

const Instructor = () => {

    // every function that starts with "use" is a hook
    // e.g. useState, useSWR, useAuth0

    // courseJSON is the variable for the state
    // setCourseJSON is the setter
    // the parameter to useState is the initial value of the state
    const initialCourseJSON = {
        "pageNumber": 1,
        "pageSize": 1,
        "total": 0,
        "classes": []
    };

    const [courseJSON, setCourseJSON] = useState(initialCourseJSON);


    // const courseJSON = '{"course" : "cs156"}';
    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Search Archived Course Data from MongoDB</h5>
                <CourseSearchFormInstructor setCourseJSON={setCourseJSON} fetchJSON={fetchInstructorHistoryNameQtrJSON} />
                <BasicCourseTable classes={courseJSON.classes} />
            </div>
        </Jumbotron>
    );
};

export default Instructor;
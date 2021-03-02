import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import CourseSearchFormQtrDeptOnly from "main/components/BasicCourseSearch/CourseSearchFormQtrDeptOnly";
import JSONPrettyCard from "main/components/Utilities/JSONPrettyCard";
import {  fetchBasicCourseHistoryJSON } from "main/services/courseSearches";

const Basic = () => {

    // every function that starts with "use" is a hook
    // e.g. useState, useSWR, useAuth0

    // courseJSON is the variable for the state
    // setCourseJSON is the setter
    // the parameter to useState is the initial value of the state

    const [courseJSON, setCourseJSON] = useState('{"course" : "cs148"}');
    

    // const courseJSON = '{"course" : "cs156"}';
    return (
        <Jumbotron>
            <div className="text-left">
                <h5>Search Archived Course Data</h5>
                <p>Data on this page is accurate for past quarters, but may be 
                    incomplete or out of date for current and future quarters.
                    Course information is not immediately updated.</p>
                <CourseSearchFormQtrDeptOnly setCourseJSON={setCourseJSON} fetchJSON={fetchBasicCourseHistoryJSON} />
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Basic;

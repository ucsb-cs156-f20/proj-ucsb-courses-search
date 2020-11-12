import React from "react";
import { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router-dom";
import BasicCourseSearchForm from "../../components/BasicCourseSearch/BasicCourseSearchForm";
import JSONPrettyCard from "../../components/Utilities/JSONPrettyCard";

const Home = () => {
    
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
                <h5>Welcome to the UCSB Courses Search App!</h5>
                <BasicCourseSearchForm setCourseJSON={setCourseJSON} />
                <JSONPrettyCard
                    expression={"courseJSON"}
                    value={courseJSON}
                />
            </div>
        </Jumbotron>
    );
};

export default Home;

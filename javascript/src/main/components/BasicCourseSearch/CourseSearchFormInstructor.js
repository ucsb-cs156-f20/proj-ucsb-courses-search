import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { standardQuarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";

const CourseSearchFormInstructor = ({ setCourseJSON, fetchJSON }) => {

    const quarters = standardQuarterRange;

    const [startQuarter, setStartQuarter] = useState(quarters[0].qqqqy);
    const [endQuarter, setEndQuarter] = useState(quarters[0].qqqqy);
    const [instructorText, setInstructor] = useState("");
    const { addToast } = useToasts()

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, instructorText }).then((courseJSON) => {
            if (courseJSON.total === 0) {
                addToast("There are no courses that match the requested criteria.", { appearance: "error" });
            }
            setCourseJSON(courseJSON);
        });
    };

    const handleInstructorOnChange = (event) => {
        setInstructor(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <SelectQuarter
                quarters={quarters}
                quarter={startQuarter}
                setQuarter={setStartQuarter}
                controlId={"InstructorSearch.StartController"}
                label={"Start Quarter"}
            />

            <SelectQuarter
                quarters={quarters}
                quarter={endQuarter}
                setQuarter={setEndQuarter}
                controlId={"InstructorSearch.EndController"}
                label={"End Quarter"}
            />

            <Form.Group controlId="InstructorSearch.Instructor">
                <Form.Label>Instructor</Form.Label>
                <Form.Control type="text" onChange={handleInstructorOnChange} value={instructorText} placeholder="Instructor Last Name">
                </Form.Control>
                <Form.Text style={{ textAlign: "left" }} muted>If there are multiple instructors with the same last name, do a search by last name first to determine how the instructor first name is abbreviated, e.g. WANG R K, WANG Y X, WANG Y F, etc. and then repeat the search.</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchFormInstructor;
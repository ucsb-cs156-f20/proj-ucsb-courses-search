import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CourseSearchFormInstructor = ({ setCourseJSON, fetchJSON, parentCallback }) => {
    const [startQuarter, setStartQuarter] = useState("20212");
    const [endQuarter, setEndQuarter] = useState("20212");
    const [instructorText, setInstructor]=useState("");
    //Checkbox
    const [cancelled, setCancelledChecked] = useState(false);
    const [closed, setClosedChecked] = useState(false);
    const [full, setFullChecked] = useState(false);
    //Checkbox

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, { startQuarter, endQuarter, instructorText}).then((courseJSON) => {
            setCourseJSON(courseJSON);
        });
        parentCallback(cancelled,closed,full);
    };

    const handleStartQuarterOnChange = (event) => {
        setStartQuarter(event.target.value);
    };

    const handleEndQuarterOnChange = (event) => {
        setEndQuarter(event.target.value);
    };

    const handleInstructorOnChange = (event) => {
        setInstructor(event.target.value);
    };

    //Checkbox
    const handleCancelledOnChange = (event) => {
        console.log("In cancelled");
        setCancelledChecked(!cancelled);
        console.log(cancelled);
    };

    const handleClosedOnChange = (event) => {
        console.log("In closed");
        setClosedChecked(!closed);
        console.log(closed);
    };

    const handleFullOnChange = (event) => {
        console.log("In full");
        setFullChecked(!full);
        console.log(full);
    };
    //Checkbox

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="InstructorSearch.StartController">
                <Form.Label>Start Quarter</Form.Label>
                <Form.Control as="select" onChange={handleStartQuarterOnChange} value={startQuarter}  >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                    <option value="20203">M20</option>
                    <option value="20202">S20</option>
                    <option value="20201">W20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="Instructor.EndController">
                <Form.Label>End Quarter</Form.Label>
                <Form.Control as="select" onChange={handleEndQuarterOnChange} value={endQuarter}  >
                    <option value="20212">S21</option>
                    <option value="20211">W21</option>
                    <option value="20204">F20</option>
                    <option value="20203">M20</option>
                    <option value="20202">S20</option>
                    <option value="20201">W20</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="InstructorSearch.Instructor">
                <Form.Label>Instructor</Form.Label>
                <Form.Control type="text" onChange={handleInstructorOnChange} value={instructorText} placeholder="Instructor Last Name">
                </Form.Control>
                <Form.Text style={{ textAlign: "left"}} muted>If there are multiple instructors with the same last name, do a search by last name first to determine how the instructor first name is abbreviated, e.g. WANG R K, WANG Y X, WANG Y F, etc. and then repeat the search.</Form.Text>
            </Form.Group>
            <Form.Group controlId="BasicSearch.Hide">
                <Form.Check type="checkbox" label="Cancelled" value={cancelled} onChange={handleCancelledOnChange} id={`inline-checkbox-1`}/>
                <Form.Check type="checkbox"  label="Closed" value={closed} onChange={handleClosedOnChange} id={`inline-checkbox-2`}/>
                <Form.Check type="checkbox" label="Full" value={full} onChange={handleFullOnChange} id={`inline-checkbox-3`}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CourseSearchFormInstructor;
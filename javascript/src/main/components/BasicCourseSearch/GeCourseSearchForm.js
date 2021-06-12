import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { standardQuarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";

const GeCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {
    const quarters = standardQuarterRange;
    const [startQuarter, setStartQuarter] = useState(quarters[0].qqqqy);
    const [endQuarter, setEndQuarter] = useState(quarters[0].qqqqy);
    const [geCode, setGeCode] = useState("A1 ");
    const { addToast } = useToasts()

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchJSON(event, {startQuarter, endQuarter, geCode}).then((courseJSON) => {
            if(courseJSON.total === 0){
                addToast("There are no courses that match the requested criteria.", { appearance: "error" });
            }
            setCourseJSON(courseJSON);
        });
    };

    const handleGeCodeOnChange = (event) => {
        setGeCode(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <SelectQuarter
                quarters={quarters}
                quarter={startQuarter}
                setQuarter={setStartQuarter}
                controlId={"BasicSearch.StartQuarter"}
                label={"Start Quarter"}
            />

            <SelectQuarter
                quarters={quarters}
                quarter={endQuarter}
                setQuarter={setEndQuarter}
                controlId={"BasicSearch.EndQuarter"}
                label={"End Quarter"}
            />
            <Form.Group controlId="BasicSearch.GeCode">
                <Form.Label>GE Code</Form.Label>
                <Form.Control as="select" onChange={handleGeCodeOnChange} value={geCode}>
                    <option value="A1 ">A1</option>
                    <option value="A2 ">A2</option>
                    <option value="B  ">B</option>
                    <option value="C  ">C</option>
                    <option value="D  ">D</option>
                    <option value="E  ">E</option>
                    <option value="F  ">F</option>
                    <option value="G  ">G</option>
                    <option value="AMH">American History</option>
                    <option value="ETH">Ethnicity</option>
                    <option value="EUR">European Cultures</option>
                    <option value="QNT">Quantitative Relationships</option>
                    <option value="WRT">Writing</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default GeCourseSearchForm;

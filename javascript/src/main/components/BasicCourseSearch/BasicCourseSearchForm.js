import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import SelectSubject from "./SelectSubject";
import useSWR from "swr";
import { useToasts } from "react-toast-notifications";
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";
import { fetchSubjectAreas } from "main/services/subjectAreaService";
import { quarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";

const BasicCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {
	const quarters = quarterRange("20084", "20213");
    const localSubject = localStorage.getItem("BasicSearch.Subject");
    const localQuarter = localStorage.getItem("BasicSearch.Quarter");
    const localLevel = localStorage.getItem("BasicSearch.Level");
	const firstDepartment = allTheSubjects[0].subjectCode;
	const [quarter, setQuarter] = useState(localQuarter || quarters[0].yyyyq);
	const [subject, setSubject] = useState(localSubject || firstDepartment);
	const [level, setLevel] = useState(localLevel || "U");
	const { addToast } = useToasts();
	const [errorNotified, setErrorNotified] = useState(false);

	const { data: subjects, error: errorGettingSubjects } = useSWR(
		"/api/public/subjects",
		fetchSubjectAreas,
		{
			initialData: allTheSubjects,
			revalidateOnMount: true,
		}
	);

	useEffect(() => {
		if (!errorNotified && errorGettingSubjects) {
			addToast(`${errorGettingSubjects}`, { appearance: "error" });
			setErrorNotified(true);
		}
	}, [errorGettingSubjects, errorNotified, addToast]);

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchJSON(event, { quarter, subject, level }).then((courseJSON) => {
			if (courseJSON.total === 0) {
				addToast("There are no courses that match the requested criteria.", {
					appearance: "error",
				});
			}
			setCourseJSON(courseJSON);
		});
	};

	const handleLevelOnChange = (event) => {
        localStorage.setItem("BasicSearch.Level", event.target.value);
		setLevel(event.target.value);
	};

    const handleQuarterOnChange = (quarter) => {
        localStorage.setItem("BasicSearch.Quarter", quarter);
        setQuarter(quarter);
    }

    const handleSubjectOnChange = (subject) => {
        localStorage.setItem("BasicSearch.Subject", subject);
        setSubject(subject);
    }

	return (
		<Form onSubmit={handleSubmit}>
			<SelectQuarter
				quarters={quarters}
				quarter={quarter}
				setQuarter={handleQuarterOnChange}
				controlId={"BasicSearch.Quarter"}
				label={"Quarter"}
			/>
			<SelectSubject
				subjects={subjects}
				subject={subject}
				setSubject={handleSubjectOnChange}
			/>
			<Form.Group controlId="BasicSearch.CourseLevel">
				<Form.Label>Course Level</Form.Label>
				<Form.Control as="select" onChange={handleLevelOnChange} value={level}>
					<option value="L">Undergrad-Lower Division</option>
					<option value="S">Undergrad-Upper Division</option>
					<option value="U">Undergrad-All</option>
					<option value="G">Graduate</option>
				</Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default BasicCourseSearchForm;

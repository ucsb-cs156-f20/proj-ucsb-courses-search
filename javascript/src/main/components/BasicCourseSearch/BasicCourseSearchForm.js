import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import SelectSubject from "./SelectSubject";
import useSWR from "swr";
import { useToasts } from "react-toast-notifications";
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";
import { fetchSubjectAreas } from "main/services/subjectAreaService";
import { standardQuarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";
import SelectLevel from "main/components/BasicCourseSearch/SelectLevel";

const BasicCourseSearchForm = ({ setCourseJSON, fetchJSON }) => {
	const quarters = standardQuarterRange;
	const levels = [["L","Undergrad-Lower"], 
					["S","Undergrad-Upper Division"], 
					["U","Undergrad-All"], 
					["G","Graduate"]];

    const localSubject = localStorage.getItem("BasicSearch.Subject");
    const localQuarter = localStorage.getItem("BasicSearch.Quarter");
	const localLevel = localStorage.getItem("BasicSearch.CourseLevel");
	
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

	const handleLevelOnChange = (level) => {
        localStorage.setItem("BasicSearch.CourseLevel", level);
		setLevel(level);
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
			<Container>
				<Row>
					<Col md = "auto"><SelectQuarter
						quarters={quarters}
						quarter={quarter}
						setQuarter={handleQuarterOnChange}
						controlId={"BasicSearch.Quarter"}
						label={"Quarter"}
					/></Col>
					<Col md = "auto"><SelectSubject
						subjects={subjects}
						subject={subject}
						setSubject={handleSubjectOnChange}
					/></Col>
					<Col md = "auto"><SelectLevel
						levels={levels}
						level={level}
						setLevel={handleLevelOnChange}
						controlId={"BasicSearch.CourseLevel"}
						label={"Course Level"}
					/></Col>
				</Row>
			</Container>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default BasicCourseSearchForm;

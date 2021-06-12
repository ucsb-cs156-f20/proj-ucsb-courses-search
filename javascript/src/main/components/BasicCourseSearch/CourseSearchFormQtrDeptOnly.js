import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { standardQuarterRange } from "main/utils/quarterUtilities";
import SelectQuarter from "main/components/BasicCourseSearch/SelectQuarter";
import SelectSubject from "./SelectSubject";
import { allTheSubjects } from "main/fixtures/Courses/subjectFixtures";
import { fetchSubjectAreas } from "main/services/subjectAreaService";
import useSWR from "swr";

const CourseSearchFormQtrDeptOnly = ({ setCourseJSON, fetchJSON }) => {
    const localSearchQuarter = localStorage.getItem("BasicSearchQtrDept.Quarter");
    const localSearchDept = localStorage.getItem("BasicSearchQtrDept.Subject");

	const quarters = standardQuarterRange;
	const [quarter, setQuarter] = useState(localSearchQuarter || quarters[0].yyyyq);
	const [subject, setSubject] = useState(localSearchDept || "CMPSC");
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
		fetchJSON(event, { quarter, subject }).then((courseJSON) => {
			if (courseJSON.total === 0) {
				addToast("There are no courses that match the requested criteria.", {
					appearance: "error",
				});
			}
			setCourseJSON(courseJSON);
		});
	};

	const handleSubjectOnChange = (subject) => {
        localStorage.setItem("BasicSearchQtrDept.Subject", subject);
		setSubject(subject);
	};
    
    const handleQuarterOnChange = (quarter) => {
        localStorage.setItem("BasicSearchQtrDept.Quarter", quarter);
        setQuarter(quarter);
    };

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
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default CourseSearchFormQtrDeptOnly;

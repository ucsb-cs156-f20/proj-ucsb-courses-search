import React from "react";
import CourseForm from "main/components/Courses/CourseForm";
import { useAuth0 } from "@auth0/auth0-react";
import { buildCreateCourse } from "main/services/Courses/CourseService";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'
import { buildCreateSchedule } from "main/services/Schedule/scheduleService";
import



const NewSchedule = () => {
  const history = useHistory();

  const { addToast } = useToasts();

  const { getAccessTokenSilently: getToken } = useAuth0();


  //TODO COVER THE TWO FUNCTIONS
  const createSchedule = buildCreateSchedule(
    getToken,
    (response) => {
      if (response.error) {
        console.log("error message: ", response.error);
        addToast(response.error, { appearance: 'error' });
      }
      else {
        history.push("/schedule");
        addToast("New Schedule Saved", { appearance: 'success' });
      }
    },
    (err) => {
      console.log("error message: ", err);
      addToast("Error saving schedule", { appearance: 'error' });
    }
  );

  return (
    <>
      <h1>Add New Schedule</h1>
      <AddSchedForm createSchedule={createSchedule}/>
    </>
  );
};

export default NewSchedule;
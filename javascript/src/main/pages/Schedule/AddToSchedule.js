import React from "react";
import { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import AddToScheduleTable from "main/components/Schedule/AddToScheduleTable";

import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import { fetchWithToken } from "main/utils/fetch";
import {
  buildDeleteSchedule
} from "main/services/Schedule/scheduleServices";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

const AddToSchedule = () => {
  const { addToast } = useToasts();
  const { getAccessTokenSilently: getToken} = useAuth0();
  const { data: schedules, mutate: mutateSchedules } = useSWR(["/api/member/schedule/getSchedules", getToken], fetchWithToken);
  const history = useHistory();

  useEffect(() => {
    mutateSchedules();
  }, [mutateSchedules]);

  // const deleteSchedule = buildDeleteSchedule(
  //   getToken,
  //   (response) => {
  //     if (response.error) {
  //       addToast(response.error, { appearance: 'error' });
  //     }
  //     else {
  //       mutateSchedules();
  //       addToast("Schedule deleted", { appearance: 'success' });
  //     }
  //   },
  //   (_err) => {
  //     addToast("Error deleting schedule", { appearance: 'error' });
  //   }
  // );

  return (
    <Jumbotron>
      <h1>
      Choose the schedule to add to
      </h1>
      <p>
      The Add To Schedule page is intended as a place where students, faculty or staff can choose which schedule they want to add the course to.
      </p>
      {schedules && (<AddToScheduleTable data={schedules}/>)}
      {/*deleteSchedule={deleteSchedule}*/}

    </Jumbotron>
  );
};

export default AddToSchedule;
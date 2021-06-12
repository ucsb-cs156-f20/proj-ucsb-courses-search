import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import SelectQuarter from 'main/components/BasicCourseSearch/SelectQuarter';
import { standardQuarterRange } from 'main/utils/quarterUtilities';

const AddSchedForm = ({ createSchedule, updateSchedule, existingSchedule }) => {

  const emptySchedule = {
    name: '',
    description: '',
    quarter: '20212',
    userId: '',
  };

  const [schedule, setSchedule] = useState(existingSchedule || emptySchedule);
  const quarters = standardQuarterRange;
  const [quarter, setQuarter] = useState(
    existingSchedule ? existingSchedule.quarter : emptySchedule.quarter
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (createSchedule) {
      createSchedule(schedule);
    } else {
      updateSchedule(schedule, schedule.id);
    }
  };

  const handleNameOnChange = (event) => {
    setSchedule({
      ...schedule,
      name: event.target.value,
    });
  };

  const handleDescriptionOnChange = (event) => {
    setSchedule({
      ...schedule,
      description: event.target.value,
    });
  };

  const handleQuarterOnChange = (quarter) => {
    setQuarter(quarter);
    setSchedule({
      ...schedule,
      quarter: quarter,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formsSchedName">
        <Form.Label>Schedule Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Schedule Name"
          value={schedule.name}
          onChange={handleNameOnChange}
          data-testid="schedule-name"
        />
      </Form.Group>

      <Form.Group controlId="formSchedDes">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Schedule Description"
          value={schedule.description}
          onChange={handleDescriptionOnChange}
          data-testid="schedule-description"
        />
      </Form.Group>
      <SelectQuarter
        quarters={quarters}
        quarter={quarter}
        setQuarter={handleQuarterOnChange}
        controlId={'PersonalSchedule.Quarter'}
        label={'Quarter'}
      />

      <Button variant="primary" type="submit" data-testid="schedule-submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddSchedForm;

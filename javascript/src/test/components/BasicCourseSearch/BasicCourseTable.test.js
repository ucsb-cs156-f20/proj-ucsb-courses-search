import React from "react";
import { render } from "@testing-library/react";
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";

describe("BasicCourseTable tests", () => {
  test("renders without crashing", () => {
    render(<BasicCourseTable classes={[]} />);
  });
});

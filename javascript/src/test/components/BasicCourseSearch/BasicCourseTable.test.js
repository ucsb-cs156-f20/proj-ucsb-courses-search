import React from "react";
import { render } from '@testing-library/react';
import BasicCourseTable from "main/components/BasicCourseSearch/BasicCourseTable";
import * as courseFixtures from "main/fixtures/Courses/courseFixtures";

import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");

describe("BasicCourseTable tests", () => {

  test("renders without crashing", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    render(<BasicCourseTable classes={[]} />);
  });

  function getBackgroundColor (getByText, text) {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	return getByText(text).closest("tr")[Object.keys(getByText(text).closest("tr"))[1]].style.backgroundColor
  }

  // Testing Lectures
  test("check that lecture sections course number appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("CMPSC 8")).not.toBe(null);
  });

  test("check that lecture sections title appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("INTRO TO COMP SCI")).not.toBe(null);
  });

  test("check that lecture sections section number appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("0100")).not.toBe(null);
  });

  test("check that lecture sections instructor appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("KHARITONOVA Y")).not.toBe(null);
  });

  test("check that lecture sections enroll code appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("07492")).not.toBe(null);
  });

  test("check that lecture sections unit appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesLectureOnly} />);
  	expect(queryByText("4")).not.toBe(null);
  });

  test("check that lectures days appear", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureOnly} />);
    expect( queryByText("T R")).not.toBe(null);
  });

  test("check that lectures times appear", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureOnly} />);
    expect( queryByText("09:30 - 10:45")).not.toBe(null);
  });

  test("check that lectures times and days appear as TBD when they don't exist", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {queryAllByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
  });

  // Testing Sections
  test("check that sections course number does not appear", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("CMPSC 8")).toBe(null);
  });

  test("check that sections title does not appear", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("INTRO TO COMP SCI")).toBe(null);
  });

  test("check that sections section number appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("0101")).not.toBe(null);
  });

  test("check that sections instructor appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("CONRAD P")).not.toBe(null);
  });

  test("check that sections enroll code appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("07500")).not.toBe(null);
  });

  test("check that sections unit appears", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnly} />);
  	expect(queryByText("4")).not.toBe(null);
  });

  test("check that instructors appear as TBD when there are none", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {queryByText} = render(<BasicCourseTable classes={courseFixtures.classesSectionOnlyTBD} />);
  	expect(queryByText("TBD")).not.toBe(null);
  });

  test("check that sections days appear", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesSectionOnly} />);
    expect( queryByText("W")).not.toBe(null);
  });

  test("check that sections times appear", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {queryByText} = render(<BasicCourseTable classes = {courseFixtures.classesSectionOnly} />);
    expect( queryByText("09:00 - 09:50")).not.toBe(null);
  });

  test("check that sections times and days appear as TBD when they don't exist", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {queryAllByText} = render(<BasicCourseTable classes = {courseFixtures.classesSectionOnlyTimeDaysTBD} />);
    expect( queryAllByText("TBD").length).toBe(2);
  });

  // Testing styling
  test("check that lectures have a blue background color", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {getByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
  	expect( getBackgroundColor(getByText, "0100") ).toBe("#CEDEFA");
  });

  test("check that sections have a light blue background color", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  	const {getByText} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
  	expect( getBackgroundColor(getByText, "0101") ).toBe("#EDF3FE");
  });

  test("add buttons tester for sections", ()=> {  
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {getByTestId} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
    expect(getByTestId('add-button-07500')).toBeInTheDocument();
  });
  test("add buttons for lecture with sections", ()=> {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {queryByTestId} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
    expect(queryByTestId('add-button-07492')).not.toBeInTheDocument();
  });
  test("add button for lecture only", ()=> {  
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {getByTestId} = render(<BasicCourseTable classes = {courseFixtures.classesLectureOnly} />);
    expect(getByTestId('add-button-07492')).toBeInTheDocument();
  });
  test("add buttons tester for last lecture", ()=> {  
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {getByTestId} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
    expect(getByTestId('add-button-07600')).toBeInTheDocument();
  });
  test("add buttons tester section", ()=> {  
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const {getByTestId} = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
    expect(getByTestId('add-button-07508')).toBeInTheDocument();
  });
  test("button renders if user is authenticated", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
    const { queryByTestId } = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
    expect(queryByTestId('add-button-07500')).toBeInTheDocument();
  });

  test("button does not render if user is authenticated", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });
    const { queryByTestId } = render(<BasicCourseTable classes = {courseFixtures.classesLectureAndSections} />);
    expect(queryByTestId('add-button-07500')).toBeNull();
  });
  
});




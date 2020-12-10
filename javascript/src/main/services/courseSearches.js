import fetch from "isomorphic-unfetch";

 const fetchBasicCourseJSON = async (event, fields) => {
    const url = `/api/public/basicsearch?qtr=${fields.quarter}&dept=${fields.department}&level=${fields.level}`;
    const courseJSON = await fetch(url);
    return courseJSON.json();
};

const fetchBasicCourseHistoryJSON = async (event, fields) => {
    const url = `/api/public/history/basicsearch?qtr=${fields.quarter}&dept=${fields.department}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};

const fetchGeQtrJSON = async (event, fields) => {
    const url = `/api/public/history/gesearch?startQtr=${fields.startQuarter}&endQtr=${fields.endQuarter}&geCode=${fields.geCode}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};
  
const fetchCourseHistoryNameQtrJSON = async (event, fields) => {
    const url = `/api/public/history/coursesearch?startQtr=${fields.startQuarter}&endQtr=${fields.endQuarter}&subjectArea=${fields.subjectArea}&courseNumber=${fields.courseNumber}&courseSuf=${fields.courseSuf}`;
    const courseResponse = await fetch(url);
    return courseResponse.json();
};


export { fetchBasicCourseJSON, fetchBasicCourseHistoryJSON, fetchCourseHistoryNameQtrJSON, fetchGeQtrJSON};
    

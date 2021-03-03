import fetch from "isomorphic-unfetch";

const fetchFullCourses = async (fields) => {
    const url = `/api/public/statistics/fullCoursesByDept?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}&department=${encodeURIComponent(fields.department)}`;
    const fullCoursesResponse = await fetch(url); 
    return fullCoursesResponse.json();
}

const fetchDivisionOccupancy = async (fields) => {
    const url = `/api/public/statistics/courseOccupancyByDivision?startQuarter=${fields.startQuarter}&endQuarter=${fields.endQuarter}&department=${fields.department}&level=${fields.level}`;
    const divisionOccupancyResponse = await fetch(url);   
    return divisionOccupancyResponse.json();
} 

const fetchClassSize = async (fields) => {
    const url = `/api/public/statistics/classSize?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}`;
    const classSizeResponse = await fetch(url);
    return classSizeResponse.json();
}

const fetchCourseOccupancy = async(fields) => {
    const url = `/api/public/statistics/courseOccupancy?startQuarter=${encodeURIComponent(fields.startQuarter)}&endQuarter=${encodeURIComponent(fields.endQuarter)}&department=${encodeURIComponent(fields.department)}`;
    const response = await fetch(url);

    return response.json();
}

const fetchTotalCoursesByDept = async(fields) => {
    const url = `/api/public/statistics/totalCourses?quarter=${encodeURIComponent(fields.quarter)}`;
    const response = await fetch(url);
    return response.json();
}

export { fetchClassSize, fetchDivisionOccupancy, fetchCourseOccupancy, fetchFullCourses, fetchTotalCoursesByDept };

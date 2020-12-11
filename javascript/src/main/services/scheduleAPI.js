import fetch from "isomorphic-unfetch";

//schedule
const fetchcreateScheduleJSON = async (event, fields) => {
    const url = `/api/public/createSchedule?name=${fields.name}&description=${fields.description}&quarter=${fields.quarter}&authorization=${fields.authorization}`;
    const createSchedule = await fetch(url);
    return createSchedule.json();
}

const fetchdeleteScheduleJSON = async (event, fields) => {
    const url = `/api/public/deleteSchedule?authorization=${fields.authorization}&id=${fields.id}`;
    const deleteSchedule = await fetch(url);
    return deleteSchedule.json();
}

const fetchgetScheduleJSON = async (event, fields) => {
    const url = `/api/public/getSchedule?authorization=${fields.authorization}&id=${fields.id}`;
    const getSchedule = await fetch(url);
    return getSchedule.json();
}

const fetchgetSchedulesJSON = async (event, fields) => {
    const url = `/api/public/getSchedules?authorization=${fields.authorization}}`;
    console.log(fields.authorization);
    const getSchedules = await fetch(url,{headers:{'Authorization':fields.authorization}});
    return getSchedules.json();
}
//scheduleItem
const fetchAddScheduleItemJSON = async (event, fields) => {
    const url = `/api/public/addScheduleItem?authorization=${fields.authorization}&scheduleId=${fields.scheduleId}&enrollCode=${fields.enrollCode}&courseId=${fields.courseId}`;
    const addScheduleItem = await fetch(url);
    return addScheduleItem.json();
}

const fetchRemoveScheduleItemJSON = async (event, fields) => {
    const url = `/api/public/removeScheduleItem?authorization=${fields.authorization}&id=${fields.id}`;
    const removeScheduleItem = await fetch(url);
    return removeScheduleItem.json();
}

const fetchgetScheduleItemsByScheduleIdJSON = async (event, fields) => {
    const url = `/api/public/getScheduleItemsByScheduleId?authorization=${fields.authorization}&scheduleId=${fields.scheduleId}`;
    const getScheduleItemsByScheduleId = await fetch(url);
    return getScheduleItemsByScheduleId.json();
}

const fetchgetScheduleItemByIdJSON = async (event, fields) => {
    const url = `/api/public/getScheduleItemById?authorization=${fields.authorization}&id=${fields.id}`;
    const getScheduleItemById = await fetch(url);
    return getScheduleItemById.json();
}

const fetchremoveScheduleItemsByScheduleIdJSON = async (event, fields) => {
    const url = `/api/public/removeScheduleItemsByScheduleId?authorization=${fields.authorization}&scheduleId=${fields.scheduleId}`;
    const removeScheduleItemsByScheduleId = await fetch(url);
    return removeScheduleItemsByScheduleId.json();
}

export { fetchcreateScheduleJSON, fetchdeleteScheduleJSON, fetchgetScheduleJSON, fetchgetSchedulesJSON, fetchAddScheduleItemJSON, fetchRemoveScheduleItemJSON, fetchgetScheduleItemsByScheduleIdJSON, fetchgetScheduleItemByIdJSON, fetchremoveScheduleItemsByScheduleIdJSON};
    

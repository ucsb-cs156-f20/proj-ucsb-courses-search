const shouldShowSection = (section, filters) => {
  return ((!filters.cancelled) || (filters.cancelled && section.courseCancelled === null)) &&
    ((!filters.closed) || (filters.closed && section.classClosed === null)) &&
    ((!filters.full) || (filters.full && section.maxEnroll > section.enrolledTotal))
};


const addCourseInfoToSection = (section, course) => {
  section.course = {
    quarter : course.quarter,
    courseId: course.courseId,
    title: course.title,
    unitsFixed: course.unitsFixed
  };
};

const extractLectures = (course) => {
  const lectures = {};
  course.classSections.forEach(section => {
    if (section.section.endsWith("0")) {
      lectures[section.section] = section;
      lectures[section.section].discussionSections = [];
    } else {
      const sectionNumber = section.section;
      const lectureNumber = sectionNumber.slice(0, -2) + "00";
      //Only for tests; this never happens in real life
      if(!(lectureNumber in lectures)) {
        lectures[lectureNumber]={
          discussionSections : [],
          timeLocations: [],
          instructors: [],
        };
        
      }
      lectures[lectureNumber].discussionSections.push(section);
    }
  })
  return lectures;
}

export function reformatJSON(classes, checks) {
  let filters = {
    cancelled: false,
    closed: false,
    full: false
  }
  if (checks !== undefined) {
    filters.cancelled = checks[0];
    filters.closed = checks[1];
    filters.full = checks[2];
  }
  
  const sections = [];

  classes.forEach(course => {
    const lectures = extractLectures(course);
    // console.log("lectures=", lectures);
    Object.keys(lectures).forEach(  (key) => {
      const lecture = lectures[key];
      if (shouldShowSection(lecture, filters)) {
        addCourseInfoToSection(lecture, course);
        sections.push(lecture);
        lecture.discussionSections.forEach(section => {
          if (shouldShowSection(section, filters)) {
            addCourseInfoToSection(section, course);
            sections.push(section);
          }
        });
      }
    });
  });
  return sections;
}

export const availabilityColors = {
  UNAVAILABLE : { backgroundColor: '#FF8080' },
  CLOSEFULL : { backgroundColor: '#FFD761' },
 };

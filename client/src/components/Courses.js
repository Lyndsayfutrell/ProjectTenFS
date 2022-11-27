import React, { useEffect, useState } from "react";

const Courses = ({ context }) => {
    let [courses, addCourses] = useState([]);
    

    useEffect(() => {
        context.data.getCourses()
        .then((data) => addCourses(data))
        .catch((err) => {
            console.log(err);
        });
    }, []);
  let courseList;
  if (courses.length > 0) {
    courseList = courses.map((course) => 
    (
      <a className="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </a>
    ));
  }
  return (
    <main>
    {(courseList === 0)
    ? <p>No Courses to display</p>
    : <div className="wrap main--grid">{courseList}</div>
    }
    </main>
  );
};

export default Courses;

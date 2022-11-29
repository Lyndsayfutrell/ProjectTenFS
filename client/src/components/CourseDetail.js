import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";


function CourseDetail({context}) {

    const [course, addCourse] = useState([]);
    const { id } = useParams();

    const authUser = context.authenticatedUser;
    let user;
    


    useEffect(() => {
        context.data.getCourseById(id)
        .then((data) => addCourse(data))
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <main>
            <div className="actions--bar">
                
                {authUser ?
                    <div className="wrap">
                        <a className="button" href="update">Update Course</a>
                        <a className="button" href="delete">Delete Course</a>
                        <a className="button button-secondary" href="/">Return to List</a>
                        </div>
                    :
                    <div className="wrap">
                    <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                }
            </div>
            {(course.length !== 0)
            ? <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.owner.firstName} {course.owner.lastName}</p>
                            <ReactMarkdown children={course.description} />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown children={course.materialsNeeded} />
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
            : <p>Nothing to display</p>
            }
        </main>
    );
}

export default CourseDetail;
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ReactMarkdown from "react-markdown";


class CourseDetail extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        UserId: '',
        fullName: '',
        errors: [],
      }


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.context.data.getCourseById(id)
        .then((data) => {
            this.setState({ title: data.title })
            this.setState({ description: data.description })
            this.setState({ estimatedTime: data.estimatedTime })
            this.setState({ materialsNeeded: data.materialsNeeded })
            this.setState({ userId: data.userId })
            this.setState({ fullName: data.owner.firstName + ' ' + data.owner.lastName })
        })
        .catch((err) => {
            console.log(err);
        });
    }


        render() {
            const {
              title,
              description,
              estimatedTime,
              materialsNeeded,
              fullName,
              userId,
              errors,
            } = this.state;

        let authUserId;
        if(this.props.authenticatedUser){
            authUserId = this.props.context.authenticatedUser[ "User ID" ];
        }
        const id = this.props.match.params.id;    


    return (
        <main>
            <div className="actions--bar">
                
                {authUserId === null || authUserId !== userId ?
                    <div className="wrap">
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>
                    :<div className="wrap">
                        <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                        <button className="button" onClick={this.handleDelete}>Delete Course</button>
                        <a className="button button-secondary" href="/">Return to List</a>
                    </div>

                }
            </div>
            {(title.length !== 0)
            ? <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{title}</h4>
                            <p>By {fullName}</p>
                            <ReactMarkdown children={description} />
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown children={materialsNeeded} />
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

    handleDelete= (event) => {
        const { password } = this.props.context;
        const username = this.props.context.authenticatedUser.Username;
        const id = this.props.match.params.id;
        event.preventDefault();
        this.props.context.data.deleteCourse(username, password, id)
        .then(
            this.props.history.push('/')
        )
        .catch( err => {
        console.log(err);
        })}


}

export default withRouter(CourseDetail);
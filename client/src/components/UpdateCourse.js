import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import Form from './Form';

class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        authorId: '',
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
            this.setState({ authorId: data.userId })
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
          authorId,
          errors,
        } = this.state;
        
    
    return (
        <main>
        { this.props.context.authenticatedUser[ "User ID" ] !== authorId
            ? <Redirect to={{
                  pathname: '/forbidden',
                }} />
            :<div className="wrap">
                <h2>Update</h2>
                <Form 
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                    <React.Fragment>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input 
                                id="title" 
                                name="title" 
                                type="text"
                                value={title} 
                                onChange={this.change} 
                                placeholder="Course Title" />

                            <p>By {this.props.context.authenticatedUser.Name}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                type="textarea"
                                value={description} 
                                onChange={this.change} 
                                placeholder="Enter Course Description" />

                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                                <input 
                                    id="estimatedTime" 
                                    name="tiestimatedTimetle" 
                                    type="text"
                                    value={estimatedTime} 
                                    onChange={this.change} 
                                    placeholder="Estimated Time" />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded" 
                                type="textarea"
                                value={materialsNeeded} 
                                onChange={this.change} 
                                placeholder="Enter Materials Needed" />
                        </div>
                    </div>
                    </React.Fragment>
            )} />
            </div>
        }
        </main>
    );
}

change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

submit = () => {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const { password } = context;
    const userId = context.authenticatedUser[ "User ID" ];
    const username = context.authenticatedUser.Username;
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const body = {

        "title": title,
        "description": description,
        "estimatedTime": estimatedTime,
        "materialsNeeded": materialsNeeded,
        "userId": userId,

    };
    context.data.updateCourse(username, password, body, id)
    .then(errors => {
            if (errors.length) {
              this.setState({ errors });
            }  else {
            this.props.history.push(`/courses/${id}`);
            }
        })
        .catch( err => {
        console.log(err);
        this.props.history.push('/error')
        })
  }

    cancel = () => {
        const id = this.props.match.params.id;
        this.props.history.push(`/courses/${id}`);
      }
}

export default withRouter(CreateCourse);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      errors: [],
    }
  
    render() {
      const {
        firstName,
        lastName,
        username,
        password,
        errors,
      } = this.state;
  
      return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <Form 
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <label for="firstName">First Name</label>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    type="text"
                    value={firstName} 
                    onChange={this.change} 
                    placeholder="First Name" />
                  <label for="lastName">Last Name</label>
                  <input 
                    id="lastName" 
                    name="lastName" 
                    type="text"
                    value={lastName} 
                    onChange={this.change} 
                    placeholder="Last Name" />
                  <label for="emailAddress">Email Address</label>
                  <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="email"
                    value={username} 
                    onChange={this.change} 
                    placeholder="Email Address" />
                  <label for="password">Password</label>
                  <input 
                    id="password" 
                    name="password"
                    type="password"
                    value={password} 
                    onChange={this.change} 
                    placeholder="Password" />
                </React.Fragment>
              )} />
            <p>
              Already have a user account? <Link to="/signin">Click here</Link> to sign in!
            </p>
          </div>
      );
    }
  
    change = (event) => {
      const firstName = event.target.firstName;
      const value = event.target.value;
  
      this.setState(() => {
        return {
          [firstName]: value
        };
      });
    }
  
    submit = () => {
      const { context } = this.props;
  
      const {
        firstName,
        lastName,
        username,
        password,
      } = this.state; 
  
      const user = {
        firstName,
        lastName,
        username,
        password,
      };
  
      context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(username, password)
          .then(() => {
            this.props.history.push('/authenticated');    
          });
        }
      })
      .catch( err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push to history stack
    });
  }
  
    cancel = () => {
      this.props.history.push('/');
    }
  }
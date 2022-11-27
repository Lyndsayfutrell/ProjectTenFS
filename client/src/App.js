import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import withContext from "./Context";
import Header from "./components/Header";
import Courses from "./components/Courses"
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './PrivateRoute';
import Course from './components/Course'

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseWithContext = withContext(Course);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute);

export default class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <HeaderWithContext />
        <Routes>
          <Route exact path="/" element={<CoursesWithContext />} />
          {/* <PrivateRoute path="/settings" element={<Course />} /> */}
          <Route path="/signin" element={<UserSignInWithContext />} />
          <Route path="/signup" element={<UserSignUpWithContext />} />
          <Route path="/signout" element={
            <PrivateRouteWithContext>
              <UserSignOutWithContext />
            </PrivateRouteWithContext>
          }
          />
          <Route path='/courses/:id' element={<CourseWithContext />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  
    );
  }
}

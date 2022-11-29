import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/global.css";
import withContext from "./Context";
import Header from "./components/Header";
import Courses from "./components/Courses"
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './PrivateRoute';
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import DeleteCourse from "./components/DeleteCourse";
import UpdateCourse from "./components/UpdateCourse"

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute);
const CreateCourseWithContext = withContext(CreateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          {/* <PrivateRoute path="/settings" element={<Course />} /> */}
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <PrivateRouteWithContext path="/signout" component={UserSignOutWithContext} />
          <PrivateRouteWithContext path="/createcourse" component={CreateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailWithContext} />
          <Route path="/courses/:id/delete" component={DeleteCourseWithContext} />
          <PrivateRouteWithContext path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  
    );
  }
}

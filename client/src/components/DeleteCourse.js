import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

export default ({ context }) => {

  const { password } = context;
  const username = context.authenticatedUser.Username;
  const { id } = useParams();


  useEffect(() =>  context.data.deleteCourse(username, password, id)
  .then(errors => {
    if (errors.length) {
      console.log(errors)
    }})
    .catch( err => {
    console.log(err);
    }));

  return (
     <p>hello</p>

  );
}
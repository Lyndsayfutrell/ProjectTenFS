import React, { Component } from "react";
import { Route, Navigate } from 'react-router-dom';
import { Consumer } from './Context';

function PrivateRoute ({ context, props  }) {
    return (
    <Consumer>
      { context => (
        <Route
          render={props => context.authenticatedUser ? (
              <Component {...props} />
              ) : (
                <Navigate to={{
                  pathname: '/signin',
                  state: { from: props.location },
                }} />
            )
          }
        />
      )}
    </Consumer>
  );
}

export default PrivateRoute;

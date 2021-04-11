import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
console.log('Protected Route loggedIn' + props.loggedIn);
    return (
        <Route>
            {props.loggedIn ? <Component {...props} /> : <Redirect to="/" />}
            {/*<Component {...props} />*/}
        </Route>
    );
};

export default ProtectedRoute;

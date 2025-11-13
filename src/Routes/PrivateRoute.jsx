import React, { use } from "react";

import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../provider/AuthProvider";
import Loading from "../pages/Loading/Loading";
// import { AuthContext } from "./AuthProvider";



const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  //   console.log(user);

  const location = useLocation();
//   console.log(location);

  if (loading) {
    return <Loading></Loading>

  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;

};

export default PrivateRoute;
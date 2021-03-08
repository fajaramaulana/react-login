import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../App";

const HomeComp = () => {
  const { state } = useContext(authContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const role = () => {
    if (state.role === 1) {
      return <Redirect to="/admin" />;
    } else if (state.role === 2) {
      return <Redirect to="/staff" />;
    } else if (state.role === 3) {
      return <Redirect to="/member" />;
    }
  };

  return role();
};

export default HomeComp;

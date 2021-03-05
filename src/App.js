import React, { useReducer, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import MenuComp from "./Component/MenuComp";
import LoginComp from "./Component/LoginComp";
import HomeComp from "./Component/HomeComp";
import RegisterComp from "./Component/RegisterComp";

// Context
export const authContext = createContext();

// inisialisasi state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "logout":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <Switch>
        <authContext.Provider value={{ state, dispatch }}>
          <MenuComp />
          {!state.isAuthenticated ? (
            <Redirect to={{ pathname: "/" }} />
          ) : (
            <Redirect to={{ pathname: "/home" }} />
          )}
          <Route exact path="/" component={LoginComp} />
          <Route exact path="/home" component={HomeComp} />
          <Route exact path="/register" component={RegisterComp} />
        </authContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

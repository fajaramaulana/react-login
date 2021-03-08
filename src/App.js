import React, { useReducer, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuComp from "./Component/MenuComp";
import LoginComp from "./Component/LoginComp";
import HomeComp from "./Component/HomeComp";
import RegisterComp from "./Component/RegisterComp";
import Public from "./Component/Public";
import Transaction from "./Component/Transaction";
import ListMahasiswa from "./Component/ListMahasiswa";

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
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "logout":
      // localStorage.clear();
      sessionStorage.clear();
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
          {/* {!state.isAuthenticated ? (
            <Redirect to={{ pathname: "/" }} />
          ) : (
            <Redirect to={{ pathname: "/home" }} />
          )} */}
          <Route exact path="/" component={Public} />
          <Route exact path="/login" component={LoginComp} />
          <Route exact path="/dashboard" component={HomeComp} />
          <Route exact path="/transaction" component={Transaction} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/mahasiswa" component={ListMahasiswa} />
        </authContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

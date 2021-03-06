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
import RoleAdmin from "./Component/RoleAccess/RoleAdmin";
import RoleStaff from "./Component/RoleAccess/RoleStaff";
import RoleMember from "./Component/RoleAccess/RoleMember";
import ListUser from "./Component/ListUser";

// Context
export const authContext = createContext();

// inisialisasi state
const initialState = {
  isAuthenticated: sessionStorage.getItem("token") ? true : false,
  user: sessionStorage.getItem("user"),
  token: sessionStorage.getItem("token"),
  tokenExpires: parseInt(sessionStorage.getItem("tokenExpires")),
  role: parseInt(sessionStorage.getItem("role")),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      sessionStorage.setItem("user", action.payload.user);
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("role", action.payload.role);
      sessionStorage.setItem("tokenExpires", action.payload.expires);
      // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        tokenExpires: action.payload.expires,
        role: action.payload.role,
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
          <Route exact path="/" component={Public} />
          <Route exact path="/login" component={LoginComp} />
          <Route exact path="/dashboard" component={HomeComp} />
          <Route exact path="/transaction" component={Transaction} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/mahasiswa" component={ListMahasiswa} />
          <Route exact path="/admin" component={RoleAdmin} />
          <Route exact path="/staff" component={RoleStaff} />
          <Route exact path="/member" component={RoleMember} />
          <Route exact path="/user" component={ListUser} />
        </authContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  Button,
  NavLink as NavLinkReactstrap,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { authContext } from "../../App";

const MenuAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { dispatch } = useContext(authContext);
  return (
    <div>
      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavLink className="navbar-brand" to="/">
          React
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/dashboard">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/user">
                List User
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/mahasiswa">
                Mahasiswa
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button
              onClick={() => dispatch({ type: "logout" })}
              color="default"
            >
              <NavLinkReactstrap>Logout</NavLinkReactstrap>
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MenuAdmin;

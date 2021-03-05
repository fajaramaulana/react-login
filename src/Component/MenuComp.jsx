import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Button,
  Nav,
  NavItem,
  NavbarText,
  NavLink as NavLinkReactstrap,
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { authContext } from "../App";

const MenuComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { state, dispatch } = useContext(authContext);

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
              <NavLink className="nav-link" to="/">
                Components
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button
              onClick={() => dispatch({ type: "logout" })}
              color="default"
            >
              {state.isAuthenticated && (
                <NavLinkReactstrap>Logout</NavLinkReactstrap>
              )}
            </Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MenuComp;

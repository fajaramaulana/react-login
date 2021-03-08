import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";

import { NavLink } from "react-router-dom";

const MenuPublic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavLink className="navbar-brand" to="/">
          React
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem></NavItem>
          </Nav>
          <NavbarText>
            <NavLink to="/login">Login</NavLink>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MenuPublic;

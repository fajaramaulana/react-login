import React, { useContext } from "react";

import { authContext } from "../App";
import MenuPublic from "./Menu/MenuPublic";
import MenuMember from "./Menu/MenuMember";
import MenuAdmin from "./Menu/MenuAdmin";
import MenuStaff from "./Menu/MenuStaff";

const MenuComp = () => {
  const { state } = useContext(authContext);

  console.log(state);
  if (!state.isAuthenticated) {
    return <MenuPublic />;
  }

  const role = () => {
    if (state.role === 1) {
      return <MenuAdmin />;
    } else if (state.role === 2) {
      return <MenuStaff />;
    } else if (state.role === 3) {
      return <MenuMember />;
    } else {
      return <MenuPublic />;
    }
  };

  return role();
};

export default MenuComp;

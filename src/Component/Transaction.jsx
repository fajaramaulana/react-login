import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Jumbotron, Button } from "reactstrap";
import { authContext } from "../App";

const Transaction = () => {
  const { state, dispatch } = useContext(authContext);
  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Transaction</h1>
        <p className="lead">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos iste
          totam saepe! Similique, neque, magnam quisquam eligendi ullam illo{" "}
        </p>
        <hr className="my-2" />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. A recusandae
          hic eos repudiandae accusamus sed voluptatibus unde suscipit placeat
          animi ipsam, provident rerum inventore odit necessitatibus impedit
          illum sunt enim.
        </p>
        <p className="lead">
          <Button color="primary">More</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Transaction;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button } from "reactstrap";
import { authContext } from "../App";
import { Redirect } from "react-router-dom";

const ListUser = () => {
  const [user, setUser] = useState([]);
  const { state, dispatch } = useContext(authContext);

  const api = "http://localhost:3001";
  const timeOut = () => {
    setTimeout(() => {
      console.log("Token expired");
      dispatch({ type: "logout" });
    }, state.tokenExpires);
  };

  useEffect(() => {
    const fetchData = async () => {
      let config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state.token,
        },
      };
      const result = await axios.get(`${api}/auth/api/v1/admin/user`, config);
      setUser(result.data.values);
    };

    fetchData();
    timeOut();
  }, []); // eslint-disable-line

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Container>
        <h2>Data Mahasiswa</h2>
        <hr />
        <div className="table-responsive">
          <Table className="table-bordered ">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button>Edit</Button>
                    <span> </span>
                    <Button color="danger"> Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default ListUser;

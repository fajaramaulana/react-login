import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Table, Button } from "reactstrap";
import { authContext } from "../App";
import { Redirect } from "react-router-dom";

const api = "http://localhost:3001";

const ListMahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const { state } = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      let config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + state.token,
        },
      };
      const result = await axios.get(
        `${api}/auth/api/v1/admin/mahasiswa`,
        config
      );
      console.log(result);
      setMahasiswa(result.data.values);
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Container>
        <h2>Data Mahasiswa</h2>
        <hr />
        <Table className="table-bordered">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Prodi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((mahasiswa) => (
              <tr key={mahasiswa.id}>
                <td>{mahasiswa.nim}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.prodi}</td>
                <td>
                  <Button>Edit</Button>
                  <span> </span>
                  <Button color="danger"> Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ListMahasiswa;

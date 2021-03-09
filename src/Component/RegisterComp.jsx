import React, { Fragment, useState } from "react";
import axios from "axios";
import qs from "querystring";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../App.css";
let Recaptcha = require("react-recaptcha");

const api = "http://localhost:3001";

const RegisterComp = (props) => {
  const initialState = {
    isSubmit: false,
    errorMessage: null,
    isVerified: false,
    alertColor: "",
  };

  const stateForm = {
    email: "",
    password: "",
    username: "",
  };

  const [visible, setVisible] = useState(true);
  const [data, setData] = useState(initialState);
  const [dataForm, setDataForm] = useState(stateForm);
  const onDismiss = () => setVisible(false);

  // specifying your onload callback function
  let callback = function () {
    console.log("Done!!!!");
  };

  // specifying verify callback function
  let verifyCallback = function (response) {
    console.log(response);
    if (response) {
      setData({
        ...data,
        isVerified: true,
      });
    }
  };

  const handleInputChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleFromSubmit = (event) => {
    event.preventDefault();
    if (data.isVerified) {
      setData({
        ...data,
        isSubmit: true,
        errorMessage: null,
      });

      const requestBody = {
        email: dataForm.email,
        password: dataForm.password,
        username: dataForm.username,
      };

      const config = {
        headers: {
          "Contet-Type": "application/x-www-form-urlendcoded",
        },
      };

      axios
        .post(`${api}/auth/api/v1/register`, qs.stringify(requestBody), config)
        .then((res) => {
          if (res.data.success === true && res.data.isRegistered === false) {
            setData({
              ...data,
              isSubmit: false,
              errorMessage: res.data.message,
              alertColor: "success",
            });

            setDataForm({
              ...dataForm,
              username: "",
              email: "",
              password: "",
            });
          } else if (
            res.data.success === false &&
            res.data.isRegistered === true
          ) {
            console.log(res.data);
            setData({
              ...data,
              isSubmit: false,
              errorMessage: res.data.message,
              alertColor: "danger",
            });
          } else {
            setData({
              ...data,
              isSubmit: false,
              errorMessage: res.data.message,
              alertColor: "danger",
            });
          }

          throw res;
        });
    } else {
      alert("You are robot! please check the checkbox");
    }
  };

  return (
    <Fragment>
      <Container>
        <br />
        <Row>
          <Col md="6">
            <div className="container-logo">
              <span class="react-logo">
                <span class="nucleo"></span>
              </span>
            </div>
          </Col>
          <Col md="6">
            <h1>Registration</h1>
            <hr />
            <Form onSubmit={handleFromSubmit}>
              <FormGroup>
                <Label for="email">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Type your username here"
                  value={dataForm.username}
                  onChange={handleInputChange}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type your email here"
                  value={dataForm.email}
                  onChange={handleInputChange}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Type your password here"
                  value={dataForm.password}
                  onChange={handleInputChange}
                ></Input>
              </FormGroup>
              <Recaptcha
                sitekey="6LeZ83YaAAAAADy6rHNzdUp2EqG_sxBm29pxykku"
                render="explicit"
                verifyCallback={verifyCallback}
                onloadCallback={callback}
              />

              <Button
                style={{ marginTop: 10 }}
                disbaled={data.isSubmit}
                color="primary"
              >
                {data.isSubmit ? "...Loading" : "Register"}
              </Button>
            </Form>
            {data.errorMessage && (
              <Alert
                style={{ marginTop: 10 }}
                color={data.alertColor}
                isOpen={visible}
                toggle={onDismiss}
              >
                {data.errorMessage}
              </Alert>
            )}
            <p>
              You have account? <Link to="/login">Login</Link>{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default RegisterComp;

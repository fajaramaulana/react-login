import React, { Fragment, useState, useContext } from "react";
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
import { authContext } from "../App";
import { Link } from "react-router-dom";

import "../App.css";
let Recaptcha = require("react-recaptcha");
const api = "http://localhost:3001";

const LoginComp = (props) => {
  const initialState = {
    isSubmit: false,
    errorMessage: null,
    isVerified: false,
  };

  const stateForm = {
    email: "",
    password: "",
  };

  const [visible, setVisible] = useState(true);
  const [data, setData] = useState(initialState);
  const [dataForm, setDataForm] = useState(stateForm);
  const { dispatch } = useContext(authContext);
  const onDismiss = () => setVisible(false);

  // specifying your onload callback function
  let callback = function () {
    console.log("Done!!!!");
  };

  // specifying verify callback function
  let verifyCallback = function (response) {
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
      };

      const config = {
        headers: {
          "Contet-Type": "application/x-www-form-urlendcoded",
        },
      };

      axios
        .post(`${api}/auth/api/v1/login`, qs.stringify(requestBody), config)
        .then((res) => {
          if (res.data.success === true && res.data.isVerified === 1) {
            console.log(res.data);
            dispatch({
              type: "login",
              payload: res.data,
            });

            props.history.push("/dashboard");
          } else if (res.data.success === true && res.data.isVerified === 0) {
            setData({
              ...data,
              isSubmit: false,
              errorMessage:
                "Your email not verified, please check your email and do verification.",
            });
          } else {
            setData({
              ...data,
              isSubmit: false,
              errorMessage: res.data.Message,
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
            <h1>Login</h1>
            <hr />
            <Form onSubmit={handleFromSubmit}>
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
                {data.isSubmit ? "...Loading" : "Login"}
              </Button>
            </Form>
            {data.errorMessage && (
              <Alert
                style={{ marginTop: 10 }}
                color="danger"
                isOpen={visible}
                toggle={onDismiss}
              >
                {data.errorMessage}
              </Alert>
            )}
            <p>
              Don't Have An Accout? <Link to="/register">Click Here</Link>{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LoginComp;

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
  Card,
  CardImg,
  Alert,
} from "reactstrap";
import { authContext } from "../App";
import { Link } from "react-router-dom";
const api = "http://localhost:3001";

const LoginComp = () => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  const { dispatch } = useContext(authContext);
  const initialState = {
    email: "",
    password: "",
    isSubmit: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFromSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmit: true,
      errorMessage: null,
    });

    const requestBody = {
      email: data.email,
      password: data.password,
    };

    const config = {
      headers: {
        "Contet-Type": "application/x-www-form-urlendcoded",
      },
    };

    axios
      .post(`${api}/auth/api/v1/login`, qs.stringify(requestBody), config)
      .then((res) => {
        if (res.data.success === true) {
          dispatch({
            type: "login",
            payload: res.data,
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
  };

  return (
    <Fragment>
      <Container>
        <br />
        <Row>
          <Col md="6">
            <Card>
              <CardImg
                top
                width="100%"
                src="https://placeimg.com/640/480/tech"
                alt="Card image cap"
              />
            </Card>
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
                  value={data.email}
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
                  value={data.password}
                  onChange={handleInputChange}
                ></Input>
              </FormGroup>
              {data.errorMessage && (
                <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                  {data.errorMessage}
                </Alert>
              )}
              <Button disbaled={data.isSubmit} color="primary">
                {data.isSubmit ? "...Loading" : "Login"}
              </Button>
            </Form>
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

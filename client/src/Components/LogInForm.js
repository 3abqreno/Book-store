import React, { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/prom_bg.css";

function LogInForm() {

  if(localStorage.length!=0){

    const userData = JSON.parse(localStorage.getItem("user"));
    if(userData.type==0)    window.location.href = "/superadmin";
    else if(userData.type==1)     window.location.href = "/admin";
    else if(userData.type==2)     window.location.href = "/home";
    else if(userData.type==3)     window.location.href = "/store";
    else if(userData.type==4)     window.location.href = "/driver";
  }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function submitForm() {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data == -1) {

          //window.location.reload();
        }
        else {
          localStorage.setItem("user",JSON.stringify(response.data));

          console.log(response.data);
          if (response.data.type == 0) {
            //superadmin
            navigate("/superadmin");
          } else if (response.data.type == 1) {
            //admin
            navigate("/admin");
          } else if (response.data.type == 2) {
            //user
            //console.log(response.data);
            navigate(`/home/`, { state: response.data });
          }
          else if (response.data.type == 3) {
            //stores
            navigate(`/store`);
          } else if (response.data.type == 4) {
            //driver
            navigate(`/driver/${response.data.id}`, { state: response.data });
            window.location.reload();
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Online Book Store</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="login">
        <Row>
          <Col>
            <h2>Log In</h2>
          </Col>

          <Row>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={changeEmail}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={changePassword}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="dark" onClick={submitForm}>
                Log In
              </Button>
            </Form>
          </Row>
        </Row>
      </Container>
    </Fragment>
  );
}

export default LogInForm;

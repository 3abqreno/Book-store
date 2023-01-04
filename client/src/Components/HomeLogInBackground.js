import React, { Fragment } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import HomePageBackground from "../Images/HomePageBackground.jpg";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import "../CSS/Style.css";
import { Link } from "react-router-dom";

function HomeLogInBackground() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Container className="HomePage">
        <img class="HomePageBackground" src={HomePageBackground} alt="..." />
        <h1 className="mainheader">Online Book Store</h1>
        <p className="text">Order books to your door</p>
        <Button className="Log_In_btn" href="http://localhost:3000/LogIn">
          Log In
        </Button>{" "}
        <Button className="Sign_Up_btn" href="http://localhost:3000/SignUp">
          Sign Up
        </Button>{" "}
        <Button className="leftmenu" onClick={handleShow}>
          ≡
        </Button>
        <Offcanvas className="menu" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Button className="leftmenubtn1" href="http://localhost:3000/LogIn">
              Log In
            </Button>{" "}
            <Button
              className="leftmenubtn2"
              href="http://localhost:3000/SignUp"
            >
              Sign Up
            </Button>{" "}
            <Link to="/signup">
              <Button className="leftmenubtn3">
                Create a business account
              </Button>{" "}
            </Link>
            <Link to="/signup">
              <Button className="leftmenubtn4">Add your store</Button>{" "}
            </Link>
            <Link to="/driversignup">
              <Button className="leftmenubtn5">Sign up to deliver</Button>{" "}
            </Link>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Fragment>
  );
}

export default HomeLogInBackground;

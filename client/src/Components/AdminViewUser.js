import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../CSS/Style.css";

function AdminViewUser() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type!=1)
  window.location.href = "/login";
  const [admin_id,setID] =useState(userData.id) ;
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [user, setUser] = useState({});

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h3>Customer Info</h3>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="uname"></Container>
      <Container className="mt-0 mb-3  w-25">
        <div className="box1text">First Name</div>
        <Form.Control
          className=" box1 mt-1 mb-3"
          type="text"
          defaultValue={user.first_name}
          readOnly="readonly"
        />
        <div className="box2text">Last Name</div>
        <Form.Control
          className=" box2 mt-1 mb-3"
          type="text"
          defaultValue={user.last_name}
          readOnly="readonly"
        />
        <div className="box3text">User Name</div>
        <Form.Control
          className=" box3 mt-1 mb-3"
          type="text"
          defaultValue={user.user_name}
          readOnly="readonly"
        />
        <div className="box4text">ID</div>
        <Form.Control
          className=" box4 mt-1 mb-3"
          type="text"
          defaultValue={user.id}
          readOnly="readonly"
        />

        <div className="box5text">Email</div>
        <Form.Control
          className="box5 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={user.email}
          readOnly="readonly"
        ></Form.Control>

        <div className="box6text">Password</div>
        <Form.Control
          className="box6 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={user.password}
          readOnly="readonly"
        ></Form.Control>

        <div className="box7text">Address</div>
        <Form.Control
          className="box7 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={user.address}
          readOnly="readonly"
        ></Form.Control>

        <div className="box8text">City ID</div>
        <Form.Control
          className="box8 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={user.city_id}
          readOnly="readonly"
        ></Form.Control>
      </Container>
    </Fragment>
  );
}

export default AdminViewUser;

import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../CSS/Style.css";

function AdminViewOrders() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type!=1&&userData.type!=4)
  window.location.href = "/login";
  const [admin_id,setID] =useState(userData.id) ;
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/pendingOrders/${id}`)
      .then((res) => {
        setorder(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [order, setorder] = useState({});
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h3>Order Info</h3>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="uname"></Container>
      <Container className="mt-0 mb-3  w-25">
        <div className="box1text">Order ID</div>
        <Form.Control
          className=" box1 mt-1 mb-3"
          type="text"
          defaultValue={order.id}
          readOnly="readonly"
        />
        <div className="box2text">User ID</div>
        <Form.Control
          className=" box2 mt-1 mb-3"
          type="text"
          defaultValue={order.user_id}
          readOnly="readonly"
        />
        <div className="box3text">Driver SSN</div>
        <Form.Control
          className=" box3 mt-1 mb-3"
          type="text"
          defaultValue={order.driver_ssn}
          readOnly="readonly"
        />
        <div className="box4text">Order Date</div>
        <Form.Control
          className=" box4 mt-1 mb-3"
          type="text"
          defaultValue={order.order_date}
          readOnly="readonly"
        />

        <div className="box5text">Delivery Date</div>
        <Form.Control
          className="box5 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={order.delivery_date}
          readOnly="readonly"
        ></Form.Control>

        <div className="box6text">Status</div>
        <Form.Control
          className="box6 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={order.status}
          readOnly="readonly"
        ></Form.Control>

        <div className="box7text">Coupon ID</div>
        <Form.Control
          className="box7 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={order.coupon_id}
          readOnly="readonly"
        ></Form.Control>

        <div className="box8text">Price</div>
        <Form.Control
          className="box8 mt-1 mb-3"
          aria-label="Default select example"
          defaultValue={order.price}
          readOnly="readonly"
        ></Form.Control>
      </Container>
    </Fragment>
  );
}

export default AdminViewOrders;

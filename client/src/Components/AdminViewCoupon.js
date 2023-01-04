import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../CSS/Style.css";

function AdminViewCoupon() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type!=1)
  window.location.href = "/login";
  const [admin_id,setID] =useState(userData.id) ;
  let { code } = useParams();
  useEffect(() => {
    console.log(code);
    axios
      .get(`http://localhost:5000/coupons/${code}`)
      .then((res) => {
        console.log(res.data);
        if(res.data[0])
        setCoupon(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const [coupon, setCoupon] = useState({});
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <h3>Coupon Info</h3>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="uname"></Container>
      <Container className="mt-0 mb-3  w-25">
        <div className="box1text">Code</div>
        <Form.Control
          className=" box1 mt-1 mb-3"
          type="text"
          defaultValue={coupon.code}
          readOnly="readonly"
        />
        <div className="box2text">Discount</div>
        <Form.Control
          className=" box2 mt-1 mb-3"
          type="text"
          defaultValue={coupon.discount}
          readOnly="readonly"
        />
        <div className="box3text">Maximum Use</div>
        <Form.Control
          className=" box3 mt-1 mb-3"
          type="text"
          defaultValue={coupon.maximum_use}
          readOnly="readonly"
        />
        <div className="box4text">Is Relative</div>
        <Form.Control
          className=" box4 mt-1 mb-3"
          type="text"
          defaultValue={coupon.is_relative}
          readOnly="readonly"
        />
      </Container>
    </Fragment>
  );
}

export default AdminViewCoupon;

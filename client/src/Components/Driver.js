import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../CSS/prom_bg.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useParams, Link } from "react-router-dom";

function Driver() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type!=4)
  window.location.href = "/login";
  const [id,setID] =useState(userData.id) ;
  const [ssn, setssn] = useState(0);
  const [Orders, setOrders] = useState([]);
  const [status, setstatus] = useState([]);
  const [Orderid, setOrderid] = useState(0);
  const [DeliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/driverssnfromdriverid/${id}`)
      .then((res) => {
        //console.log(res.data.ssn);
        setssn(res.data.ssn);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(ssn);
    axios
      .get(`http://localhost:5000/ordersbycertaindriver/${ssn}`)
      .then((res) => {
        setOrders(res.data);
        console.log(ssn);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [ssn]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/ordersdeliveredbycertaindriver/${ssn}`)
      .then((res) => {
        setDeliveredOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [Orders]);

  function delivered(order_id) {
    axios
      .post(`http://localhost:5000/deliverOrder`, { order_id })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>Driver</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="Store_bg">
        <Tabs
          defaultActiveKey="ViewAssignedOrders"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="ViewAssignedOrders" title="View Assigned Orders">
            <h1>My Orders</h1>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Details</th>
                  <th scope="col">Delivered</th>
                </tr>
              </thead>
              <tbody>
                {Orders.map((Order) => (
                  <tr>
                    <td>
                      {Order.id}{" "}
                      <Link to={`/ordersbycertaindriver/${Order.id}`}></Link>
                    </td>
                    <td>
                      {
                        <Link to={`/pendingOrders/${Order.id}`}>
                          <Button className="viewbtn w-25" variant="dark">
                            {" "}
                            View{" "}
                          </Button>
                        </Link>
                      }
                    </td>
                    <td>
                      {
                        <Button
                          className="viewbtn w-25"
                          variant="dark"
                          onClick={() => delivered(Order.id)}
                        >
                          {" "}
                          Delivered{" "}
                        </Button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="ViewDeliveredOrders" title="View Delivered Orders">
            <h1>History</h1>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {DeliveredOrders.map((DeliveredOrder) => (
                  <tr>
                    <td>
                      {DeliveredOrder.id}{" "}
                      <Link
                        to={`/ordersbycertaindriver/${DeliveredOrder.id}`}
                      ></Link>
                    </td>
                    <td>
                      {
                        <Link to={`/pendingOrders/${DeliveredOrder.id}`}>
                          <Button className="viewbtn w-25" variant="dark">
                            {" "}
                            View{" "}
                          </Button>
                        </Link>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
        </Tabs>
      </Container>
    </Fragment>
  );
}

export default Driver;

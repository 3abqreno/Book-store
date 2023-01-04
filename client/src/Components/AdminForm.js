import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../CSS/prom_bg.css";
import "../CSS/Style.css";
import axios from "axios";

function AdminForm() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type!=1&&userData.type!=0)
  window.location.href = "/login";
  const [id,setID] =useState(userData.id) ;
  useEffect(() => {
    axios
      .get("http://localhost:5000/drivers")
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/stores")
      .then((res) => {
        setStores(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/coupons")
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/pendingOrders")
      .then((res) => {
        setPendingOrders(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/wishlists_stats")
      .then((res) => {
        setwishlist(res.data);
      })
      .catch((err) => console.log(err));

      axios
      .get("http://localhost:5000/adminViewTickets")
      .then((res) => {
        setticket(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [show, setShow] = useState(false);

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [maximum_use, setMaximumUse] = useState(0);
  const [is_relative, setIsRelative] = useState("0");
  const [viewUserWishlists, setwishlist] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [driver_ssn, setDriverSSN] = useState(0);
  const [order_id, setOrderID] = useState(0);
  const [driver_user_id, setDriverID] = useState(0);
  const [book, setbook] = useState([]);
  const [tickets, setticket] = useState([]);
  const [adminReply, setreply] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    axios
    .post(
      `http://localhost:5000/AdminGiveOrderToDriver`,
      {
        driver_ssn: driver_ssn,
        order_id: order_id,
        driver_user_id: driver_user_id,
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  },[driver_user_id])

  function changeCoupon(e) {
    setCode(e.target.value);
  }

  function changeDiscount(e) {
    console.log(e.target.value);
    setDiscount(e.target.value);
  }

  function changeMaximumUse(e) {
    setMaximumUse(e.target.value);
  }

  function changeIsRelative(e) {
    setIsRelative(e.target.value);
  }

  function addCoupon(e) {
    //needed validations
    if(code==""||discount<1||maximum_use<1)return;

    axios
      .post("http://localhost:5000/addCoupon", {
        code,
        discount,
        maximum_use,
        is_relative,
      })
      .then((res) => {
        window.location.reload();
        if (res.data == -1) {
          console.log(`${code} IS ALREADY IN THE SYSTEM`);
        } else {
          console.log(`SUCCESSFUL INSERTION OF CODE ${res.data.code}`);
        }
      })
      .catch((err) => console.log(err));
  }
  function changereply(e)
  {
    setreply(e.target.value);
  }
  function addreply(id)
  {
    axios
       .post(`http://localhost:5000/ticketReply`,{adminReply,id})
       .then((res) => {
       })
       window.location.reload()
       .catch((err) => console.log(err));
  }
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h3>Admin</h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Button
                  variant="light"
                  className="addcoupon_btn"
                  onClick={handleShow}
                >
                  {" "}
                  Add New Coupon{" "}
                </Button>
              </Nav.Item>
              <Nav.Link href="/pendingRequests">View Pending Requests</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>Add New Coupon</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className="AddCoupon">
            <Row>
              <Form>
                <Form.Group className="mb-3 " controlId="couponform">
                  <Form.Control
                    className="form-control w-75"
                    type="string"
                    maxLength={6}
                    placeholder="Enter Coupon"
                    onChange={changeCoupon}
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="couponform">
                  <Form.Control
                    className="form-control w-75"
                    type="number"
                    maxLength={6}
                    placeholder="Enter Discount"
                    onChange={changeDiscount}
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="couponform">
                  <Form.Control
                    className="form-control w-75"
                    type="number"
                    maxLength={6}
                    placeholder="Enter Maximum Use"
                    onChange={changeMaximumUse}
                  />
                </Form.Group>
                <Form.Select
                  className="type mt-3 mb-3"
                  aria-label="Default select example"
                  onChange={changeIsRelative}
                >
                  <option value="0">Actual Discount</option>
                  <option value="1">Relative Discount</option>
                </Form.Select>
                <Button variant="dark" onClick={addCoupon}>
                  Add
                </Button>
              </Form>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
      <Container className="Admin_bg">
        <Tabs
          defaultActiveKey="Customers"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="Customers" title="Customers">
            <h1>Customers</h1>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr>
                    <td>
                      {customer.id} <Link to={`/users/${customer.id}`}></Link>
                    </td>
                    <td>
                      {customer.user_name}{" "}
                      <Link to={`/users/${customer.id}`}></Link>
                    </td>
                    <td>
                      {customer.email}{" "}
                      <Link to={`/users/${customer.id}`}></Link>
                    </td>
                    <td>
                      <Link to={`/users/${customer.id}`}>
                        <Button className="viewbtn" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="Stores" title="Stores">
            <h1>Stores</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr>
                    <td>
                      {store.id} <Link to={`/stores/${store.id}`}></Link>
                    </td>
                    <td>
                      {store.user_name} <Link to={`/stores/${store.id}`}></Link>
                    </td>
                    <td>
                      {store.email} <Link to={`/stores/${store.id}`}></Link>
                    </td>
                    <td>
                      <Link to={`/stores/${store.id}`}>
                        <Button className="viewbtn" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="Drivers" title="Drivers">
            <h1>Drivers</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr>
                    <td>
                      {driver.id} <Link to={`/drivers/${driver.ssn}`}></Link>
                    </td>
                    <td>
                      {driver.user_name}{" "}
                      <Link to={`/drivers/${driver.ssn}`}></Link>
                    </td>
                    <td>
                      {driver.email} <Link to={`/drivers/${driver.ssn}`}></Link>
                    </td>
                    <td>
                      <Link to={`/drivers/${driver.ssn}`}>
                        <Button className="viewbtn" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="Coupons" title="Coupons">
            <h1>Coupons</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Details</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr>
                    <td>
                      {coupon.code} <Link to={`/coupons/${coupon.code}`}></Link>
                    </td>
                    <td>
                      <Link to={`/coupons/${coupon.code}`}>
                        <Button className="viewbtn w-30" variant="dark">
                          {" "}
                          View{" "}
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        className="viewbtn w-25"
                        variant="dark"
                        onClick={function (e) {
                          axios
                            .delete(
                              `http://localhost:5000/coupons/${coupon.code}`
                            )
                            .then((res) => {
                              console.log(res);
                              window.location.reload();
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        {" "}
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>

          <Tab eventKey="Pending Orders" title="Pending Orders">
            <h1>Orders</h1>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Details</th>
                  <th scope="col">Select Driver</th>
                  <th scope="col">Assign</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((pendingOrder) => (
                  <tr>
                    <td>
                      {pendingOrder.id}{" "}
                      <Link to={`/pendingOrders/${pendingOrder.id}`}></Link>
                    </td>
                    <td>
                      {
                        <Link to={`/pendingOrders/${pendingOrder.id}`}>
                          <Button className="viewbtn w-30" variant="dark">
                            {" "}
                            View{" "}
                          </Button>
                        </Link>
                      }
                    </td>
                    <td>
                      <select
                        className="combo"
                        onChange={(e) => {
                          setDriverSSN(e.target.value);
                          console.log(e.target.value);
                        }}
                      >
                        {drivers.map((driver) => (
                          <option value={driver.ssn}>{driver.email} </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <Button
                        variant="dark"
                        className="viewbtn w-30"
                        onClick={function (e) {
                          setOrderID(pendingOrder.id);
                          axios
                            .post(
                              `http://localhost:5000/driveruseridgivenssn`,
                              { driver_ssn }
                            )
                            .then((res) => {
                              setDriverID(res.data.user_id);
                            })
                            .catch((err) => console.log(err));
                          //console.log(driver_ssn, pendingOrder.id, driver_id_sui);
                       
                        }}
                      >
                        {" "}
                        Assign
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="wishlists" title="Wishlists">
            <h1>Wishlists</h1>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Book</th>
                  <th scope="col">Num. Of Occurrences</th>
                </tr>
              </thead>
              <tbody>
                {viewUserWishlists.map((wishlist) => (
                  <tr>
                    <td>
                      {wishlist.title}
                    </td>
                    <td>
                      {wishlist.countUsers}{" "}
                    </td>
                    
                  </tr>
                ))}
              </tbody>

            </table>
          </Tab>
          <Tab eventKey="Tickets" title="Tickets">
            <h1>Tickets</h1>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#ticket_id</th>
                  <th scope="col">Ticket</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr>
                    <td>
                      {ticket.id}
                    </td>
                    <td>
                      <Row>
                      {ticket.user_complaint}
                      </Row>
                      <Row className="mt-3">
                        <Col>
                      <Form.Control className="w-150" onChange={changereply} placeholder="Add Reply"></Form.Control>
                      </Col>
                      <Col>
                      <Button variant="success" onClick={()=>addreply(ticket.id)}>Reply</Button>
                      </Col>
                      </Row>
                    </td>
                    <td key={ticket.id}>
                     
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

export default AdminForm;

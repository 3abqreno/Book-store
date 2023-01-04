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
import "../CSS/prom_bg.css";
import "../CSS/Style.css";
import axios from "axios";
function ViewReplies() {
    if (localStorage.length == 0) window.location.href = "/";
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData.type != 2) window.location.href = "/login";
    const [id, setID] = useState(userData.id);
    const [tickets, setticket] = useState([]);
    useEffect(() => {
    axios
    .get(`http://localhost:5000/userViewTickets/${id}`)
    .then((res) => {
      setticket(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}, []);

function viewAcount() {
  window.location.href = "/home/ViewAccount";
}
function wishlist() {
  window.location.href = "/home/wishlists";
}
function cart(){
  window.location.href ="/home/cart";

}
  return (
<Fragment>
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">
        <Row>
          <Col>
        <h3>Online Book Store</h3>
        </Col>
        <Col>
        Tickets & Replies
        </Col>
        </Row>
       
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <Button className="cart_btn" onClick={cart}>
              <svg
                className="carticon"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="60"
                color="white"
                class="bi bi-cart3"
                viewBox="0 4 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </Button>

<Button className="heart_btn" onClick={wishlist}>

            <svg
              className="hearticon"
              xmlns="http://www.w3.org/2000/svg"
              color="white"
              width="30"
              height="60"
              fill="white"
              class="bi bi-heart"
              viewBox="0 4 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </Button>

          <Button className="person_btn" onClick={viewAcount}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="60"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 4 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </Button>
  <table class="table table-striped">
  <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Ticket</th>
    <th scope="col">Reply</th>
    </tr>
  </thead>
  <tbody>
  {tickets.map((ticket,index) => (
    <tr>
      <th scope="row">{index+1}</th>
      <td>{ticket.user_complaint}</td>
      <td>{ticket.admin_reply}</td>
    </tr>
     ))}
     </tbody>

   </table>

   
    </Fragment>
  )
}

export default ViewReplies
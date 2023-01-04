import React, { Fragment, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/prom_bg.css'
import { useParams } from 'react-router-dom';
import { Row, Tab, Tabs, Col } from 'react-bootstrap';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import "../CSS/Style.css";

function Wishlist() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type==1||userData.type==0)
  window.location.href = "/login";
  const [user_id,setID] =useState(userData.id) ;
  const [wishlists, setWishLists] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/wishlists/${user_id}`)
      .then((res) => {
        setWishLists(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
function deletewishlist(book_id)
{
  axios
      .post(`http://localhost:5000/deleteWishlist`,{user_id,book_id})
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
    }
    function viewBook (book_id){
      window.location.href="/home/wishlists/"+book_id;
    }
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
      
      <Navbar bg="dark" variant="dark" expand="lg" className="nav">
            <Container fluid>
              <Navbar.Brand className="title" href="/home">
              <Row>
          <Col>
        <h3 hre>Online Book Store</h3>
        </Col>
        <Col>Wishlist
        </Col>
        </Row>
              </Navbar.Brand>
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
      <Container className="Store_bg">
      
               <table class="table">
               <thead class="thead-dark">
                 <tr>
                   <th scope="col">Book</th>
                   <th scope="col">View</th>
                   <th scope="col">Delete</th>
                 </tr>
               </thead>
               <tbody>
                 {wishlists.map((wishlist) => (
                   <tr key={wishlist.book_id}>
                     <td>
                       {wishlist.title}
                     </td>
                     <td>
                   
                     <Button onClick={()=>viewBook(wishlist.book_id)} variant='success' >View</Button>
                     </td>
                     <td>
                     <Button variant='success' onClick={()=>deletewishlist(wishlist.book_id)}>Delete</Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
      </Container>


    </Fragment>
  )
}

export default Wishlist
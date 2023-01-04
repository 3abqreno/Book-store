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
import axios from "axios";
import TestAddbook from "./TestAddbook";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";

function StoresUI() {
  if(localStorage.length==0)
  window.location.href = "/";
  const userData = JSON.parse(localStorage.getItem("user"));
  if(userData.type!='3')
  window.location.href = "/login";
  const [id,setID] =useState(userData.id) ;
  const [genre_id, setGenreId] = useState('');
  const [langId, setLanguageId] = useState('');
  const [genre, setGenreName] = useState('');
  const [language, setLanguageName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/userbooks/${id}`).then((res) => {
      setBook(res.data);
      setGenreId(res.data.genre_id);
      setLanguageId(res.data.language_id)
    }).catch((err) => console.log(err));

    axios.get(`http://localhost:5000/wishlists_stats/${id}`).then((res) => {
      console.log(res.data);
      setWishlists(res.data);
    }).catch((err) => console.log(err));

  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:5000/genrenamefromgenreid/${genre_id}`).then((res) => {
        setGenreName(res.data.name);
    }).catch(err => console.log(err));

}, [genre_id]);

useEffect(() => {
    axios.get(`http://localhost:5000/languagenamefromlanguageid/${langId}`).then((res) => {
        setLanguageName(res.data.name);
    }).catch(err => console.log(err));

}, [langId]);
  const [book, setBook] = useState([])
  const [wishlists, setWishlists] = useState([])

  function deletebook(id)
  {
    axios.post(`http://localhost:5000/deletebook`,{id}).then((res) => {
      window.location.reload();
    }).catch((err) => console.log(err));
    
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
            Store
            </Col>
            </Row>
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
          defaultActiveKey="viewbooks"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="AddBook" title="Add Book">
            <h1>Add a new book</h1>
            <TestAddbook />
          </Tab>
          <Tab eventKey="viewbooks" title="View Books">
            <h1>View books</h1>
            <div className="container mg-t">
              <div className='row'>
                {
                  book.map(book => {
                    return (
                      <div className="col-lg-4 col-md-6 col-12" key={book.id}>
                        <div>
                          <Card className="course-card">
                            <Card.Img variant="top" src={book.image}></Card.Img>
                            <Card.Body>
                              <Card.Title>{book.title}</Card.Title>
                              <p>Description: {book.description}</p>
                              <p>Author: {book.author_name}</p>
                              <p>Version: {book.version}</p>
                              <p>ISBN: {book.isbn}</p>

<Button variant="success" onClick={()=>deletebook(book.id)} >Delete</Button>
                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                    )
                  })
                }
              </div> {/* ./row*/}
            </div>

          </Tab>
          <Tab eventKey="ViewWishlist" title="View Customers' Wishlists">
            <h1>View Wishlists</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Book</th>
                  <th scope="col">Num. Of Occurrences</th>
                  <th scope="col">Avialability</th>
                  <th scope="col">ISBN</th>
                </tr>
              </thead>
              <tbody>
                {wishlists.map((wishlist) => (
                  <tr>
                    <td>
                      {wishlist.title}
                    </td>
                    <td>
                      {wishlist.countUsers}{" "}
                    </td>
                    <td>
                      {wishlist.status}{" "}
                    </td>
                    <td>
                      {wishlist.isbn}{" "}
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

export default StoresUI;

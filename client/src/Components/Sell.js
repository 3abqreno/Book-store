import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Combobox from "react-widgets/Combobox";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../CSS/Style.css";

function Sell() {
  const id = JSON.parse(localStorage.getItem("user")).id;
  console.log(id);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [cities, setCities] = useState([]); //should be used in other page (wrote in here for practice)
  //title, genre_id, isbn, author_name, language_id, purshace_price, version, description, image, user_id, count
  const [title, setTitle] = useState("");
  const [genre_id, setGenre] = useState("");
  const [isbn, setISBN] = useState("");
  const [author_name, setAuthor] = useState("");
  const [language_id, setLanguage] = useState("");
  const [purshace_price, setPrice] = useState("");
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const count = 1; //to be changed if store
  const user_id = id; //to be passed between pages
  const [base64, settingBase64] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/genres")
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/languages")
      .then((res) => {
        setLanguages(res.data);
      })
      .catch((err) => console.log(err));
    //should be used in other page (wrote in here for practice)
    axios
      .get("http://localhost:5000/cities")
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function changeTitle(e) {
    setTitle(e.target.value);
  }

  function changeAuthor(e) {
    setAuthor(e.target.value);
  }

  function changePrice(e) {
    setPrice(e.target.value);
  }

  function changeVersion(e) {
    setVersion(e.target.value);
  }

  function changeGenre(e) {
    setGenre(e.target.value);
  }

  function changeLanguage(e) {
    setLanguage(e.target.value);
  }

  function changeISBN(e) {
    setISBN(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function changeURL(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      settingBase64(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function tryImage(e) {
    var file = document.getElementById("imageInput");
    var form = new FormData();
    form.append("image", file.files[0]);
    var settings = {
      url: "https://api.imgbb.com/1/upload?key=bdea9a234b122ef7ef9abc17db08173e",
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    };

    let imgbb = await axios(settings);
    if (imgbb.data.data.display_url == "") {
      imgbb = await axios(settings);
    }
    //setImage(imgbb.data.data.display_url);
    axios
      .post("http://localhost:5000/addbook", {
        title,
        genre_id,
        isbn,
        author_name,
        language_id,
        purshace_price,
        version,
        description,
        image: imgbb.data.data.display_url,
        user_id,
        count,
      })
      .then((res) => {
        console.log(res.data); //add book with image upload (has some bugs)
      })
      .catch((err) => console.log(err));
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <h1>Online Book Store</h1>
            <h5>Sell your book</h5>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                onChange={changeTitle}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                onChange={changeDescription}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                onChange={changeAuthor}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="purchaseClear">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Enter the price this book will be sold at"
                onChange={changePrice}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Book Version</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Enter book version"
                onChange={changeVersion}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              onChange={changeGenre}
            >
              <Form.Label>Genre</Form.Label>
              <select className="form-control">
                {genres.map((genre) => (
                  <option value={genre.id}>{genre.name} </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              onChange={changeLanguage}
            >
              <Form.Label>Language</Form.Label>
              <select className="form-control">
                {languages.map((language) => (
                  <option value={language.id}>{language.name} </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              onChange={changeISBN}
            >
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" placeholder="Enter book isbn" />
            </Form.Group>

            <Form.Group className="mb-3" onChange={changeURL}>
              <Form.Label>Book Image</Form.Label>
              <Form.Control
                type="file"
                id="imageInput"
                placeholder="Enter Image"
              />
            </Form.Group>

            <Button variant="dark" onClick={tryImage}>
              Sell Book
            </Button>
          </Form>
        </div>
      </Container>
    </Fragment>
  );
}

export default Sell;

import React, { Fragment, useEffect, useState } from "react";
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
import Card from "react-bootstrap/Card";





function Bidding() {
    if (localStorage.length == 0)
        window.location.href = "/";
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData.type != 2)
        window.location.href = "/login";

    const user_id = JSON.parse(localStorage.getItem("user")).id;


    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [cities, setCities] = useState([]); //should be used in other page (wrote in here for practice)
    //title, genre_id, isbn, author_name, language_id, purshace_price, version, description, image, user_id, count
    const [title, setTitle] = useState('');
    const [genre_id, setGenre] = useState(1);
    const [isbn, setISBN] = useState(1);
    const [author_name, setAuthor] = useState('');
    const [language_id, setLanguage] = useState(1);
    const [purshace_price, setPrice] = useState(15);
    const [version, setVersion] = useState(1);
    const [description, setDescription] = useState('hi');
    const [image, setImage] = useState('');
    const [ending_time, setEndTime] = useState('');
    const [myBids, setMyBids] = useState([]);
    const count = 1 //to be changed if store

    const [base64, settingBase64] = useState('')
    useEffect(() => {
        axios.get('http://localhost:5000/genres').then((res) => {
            setGenres(res.data);
        }).catch(err => console.log(err));
        axios.get('http://localhost:5000/languages').then((res) => {
            setLanguages(res.data);
        }).catch(err => console.log(err));
        //should be used in other page (wrote in here for practice)
        axios.get('http://localhost:5000/cities').then((res) => {
            setCities(res.data);
        }).catch(err => console.log(err));
        axios.get('http://localhost:5000/cities').then((res) => {
            setCities(res.data);
        }).catch(err => console.log(err));
        axios.post('http://localhost:5000/myBid',{user_id}).then((res) => {
            console.log(res.data);
            setMyBids(res.data);
        }).catch(err => console.log(err));
    }, [])

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

    function changeDate(e) {

        setEndTime(e.target.value);
    }

    function changeURL(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {

            settingBase64(reader.result);
        }
        reader.readAsDataURL(file);
    }

function finishBid(book_id){
    axios
    .post(`http://localhost:5000/bidfinished`,{book_id})
    .then((res) => {
        window.location.reload();
    })
    .catch((err) => console.log(err));
}

    async function tryImage(e) {
        // console.log(new Date(ending_time));
        if(new Date(ending_time)<new Date())return;
        console.log('hello');

        var file = document.getElementById('imageInput');
        var form = new FormData();
        form.append("image", file.files[0])
        var settings = {
            "url": "https://api.imgbb.com/1/upload?key=bdea9a234b122ef7ef9abc17db08173e",
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form
        };

        let imgbb = await axios(settings);
        if (imgbb.data.data.display_url == '') {
            imgbb = await axios(settings);
        }
        console.log(title, genre_id, isbn, author_name, language_id, purshace_price, version, description, imgbb.data.data.display_url, user_id, count);
        //setImage(imgbb.data.data.display_url);

        axios.post('http://localhost:5000/addbidbook', { title, genre_id, isbn, author_name, language_id, purshace_price, version, description, image: imgbb.data.data.display_url, user_id, count, ending_time }).then(res => {
            console.log('win'); //add book with image upload (has some bugs)    
            window.location.href='/home';
            console.log(res.data); //add book with image upload (has some bugs)
        }).catch(err => console.log(err))
    }
    return (
        <Fragment>
              <Tabs
          defaultActiveKey="bidItem"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="bidItem" title="bidItem">
          <Container className="Admin_bg">
                <h1>Place your bid item</h1>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" onChange={changeTitle} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" onChange={changeDescription} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Author Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter author name" onChange={changeAuthor} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="purchaseClear">
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="number" min="0" placeholder="Enter the price this book will be sold at" onChange={changePrice} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Book Version</Form.Label>
                        <Form.Control type="number" min="0" placeholder="Enter book version" onChange={changeVersion} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeGenre}>
                        <Form.Label>Genre</Form.Label>
                        <select className='form-control'>
                            {
                                genres.map(genre => (
                                    <option value={genre.id}>{genre.name} </option>
                                ))
                            }
                        </select>


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeLanguage}>
                        <Form.Label>Language</Form.Label>
                        <select className='form-control'>
                            {
                                languages.map(language => (
                                    <option value={language.id}>{language.name} </option>
                                ))
                            }
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeISBN}>
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="number" placeholder="Enter book isbn" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" onChange={changeDate}>
                        <Form.Label>End Bid Time</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>

                    <Form.Group className="mb-3" onChange={changeURL}>
                        <Form.Label>Book Image</Form.Label>
                        <Form.Control type="file" id='imageInput' placeholder="Enter Image" />
                    </Form.Group>

                    <Button variant="dark" onClick={tryImage}>
                        Add Book
                    </Button>
                </Form>
            </Container>
         </Tab>
         <Tab eventKey="myBids" title="myBids">
         <div className="container mt-4">
        <div className="row">
          {myBids.map((myBid) => (
            <div className="col-lg-4 col-md-6 col-12" key={myBid.book_id}>
              <div>
                <Card className="course-card">
                  <Card.Img
                    variant="top"
                    src={myBid.image}
                    class="kadyImage"
                  ></Card.Img>
                  <Card.Body>
                    <Card.Title>{myBid.title}</Card.Title>
                    <div>
        
                      <Link>
                        <Button
                          variant="success"
                          className="ml-3"
                          onClick={() => finishBid(myBid.book_id)}
                        >
                          {" "}
                          finsih Bid
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>{" "}
        {/* ./row*/}
      </div>
         </Tab>
         </Tabs>
           
        </Fragment>
    )
}

export default Bidding

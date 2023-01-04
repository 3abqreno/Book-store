import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../CSS/prom_bg.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Biditem() {
    if (localStorage.length == 0)
        window.location.href = "/";
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData.type == 1 || userData.type == 0)
        window.location.href = "/login";
    const [id, setID] = useState(userData.id);
    const [bid_item, setBid] = useState({});
    const { book_id } = useParams();
    console.log(book_id);

    const [image, setImage] = useState('');
    const [title, settitle] = useState('');
    const [author_name, setauthor_name] = useState('');
    const [purchase_price, setpurchase_price] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setQuantityCounter] = useState(1);
    const [readbooksquantity, setQuantity] = useState(0);
    const [order_id, setORDERID] = useState(0);
    const [genre_id, setGenreId] = useState('');
    const [version, setVersion] = useState('');
    const [isbn, setIsbn] = useState('');
    const [langId, setLanguageId] = useState('');
    const [genre, setGenreName] = useState('');
    const [language, setLanguageName] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [num, setNum] = useState(-1);

    useEffect(() => {
        axios.post(`http://localhost:5000/bid_item_data`, { book_id }).then((res) => {
            console.log(res.data.starting_time);
            console.log(res.data.ending_time);
            setStartDate(res.data.starting_time);
            setEndDate(res.data.ending_time);
           
        }).catch((err) => console.log(err));
        axios.post(`http://localhost:5000/bookinfo`, { book_id }).then((res) => {
            // console.log(res.data);
            setImage(res.data.image)
            settitle(res.data.title)
            setauthor_name(res.data.author_name)
            setpurchase_price(res.data.purchase_price)
            setdescription(res.data.description)
            setQuantity(res.data.count)
            setGenreId(res.data.genre_id)
            setVersion(res.data.version)
            setIsbn(res.data.isbn)
            setCurrentPrice(res.data.purchase_price)
            setLanguageId(res.data.language_id)
        }).catch((err) => console.log(err));

    }, []);

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


    function increment(e) {
        if (quantity < readbooksquantity) {
            setQuantityCounter(quantity + 1);
        }


    }
    function decrement(e) {
        if (quantity > 1) {
            setQuantityCounter(quantity - 1);
        }

    }
    function changeNum(e){
        setNum(e.target.value);
    }
    function addBid(e) {
        console.log(currentPrice);
        if(num<=currentPrice) return;
        axios.post(`http://localhost:5000/addbidonbook`, { user_id:id, book_id, purshace_price:num }).then((res) => {
            window.location.reload();
        }).catch((err) => console.log(err));

    }

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <h3>Online Book Store</h3>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row>
                <Col className='image'>
                    <Container class="col-sm ml-5 mt-3">
                        <img src={image} />
                    </Container>
                </Col>

                <Col className="col-sm mt-3">
                    <Row>
                        <Container >
                            <h1>{title}</h1>

                        </Container>
                    </Row>
                    <Row>
                        <Container>Current price: {purchase_price} L.E</Container>
                    </Row>
                    <Row>
                        <Container>Author: {author_name}</Container>
                    </Row>
          
                    <Row>
                        <Container>genre: {genre}</Container>
                    </Row>
                    <Row>
                        <Container>Version: {version}</Container>
                    </Row>
                    <Row>
                        <Container>Language: {language} </Container>
                    </Row>
                    <Row>
                        <Container>ISBN: {isbn}</Container>
                    </Row>
                    <Row>
                        <Container>startDate:{startDate} </Container>
                    </Row>
                    <Row>
                        <Container>endDate:  {endDate}</Container>
                    </Row>
                    <Row>
                        <Container>Description:  {description}</Container>
                    </Row>
                    <input type="number" onChange={changeNum} />
                    <Container className="quantity">
                        
                        <Row>
                      

                        </Row>
                        <Row>
                            <Button className='mt-2' variant='success' onClick={addBid} class="btn btn-success w-75">bid now</Button>
                        </Row>

                    </Container>
                </Col>
            </Row>
            
        </Fragment>
    )
}

export default Biditem;
import React, { Fragment, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import '../CSS/prom_bg.css'

function Superadmin() {
    if(localStorage.length==0)
    window.location.href = "/";
    const userData = JSON.parse(localStorage.getItem("user"));
    if(userData.type!=0)
    window.location.href = "/login";
    
    const [id,setID] =useState(userData.id) ;
    useEffect(() => {
        axios.get('http://localhost:5000/cities').then((res) => {
            setCities(res.data);
        }).catch(err => console.log(err));
    }, [])
    const [cities, setCities] = useState([]); //should be used in other page (wrote in here for practice)

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [address, setAddress] = useState('');
    const [city_id, setCityID] = useState('1');
    const [user_name, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const type = '1'

    function changeFirst(e) {
        setFirst(e.target.value);
    }

    function changeLast(e) {
        setLast(e.target.value);
    }

    function changeCity(e) {
        setCityID(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changeAddress(e) {
        setAddress(e.target.value);
    }

    function changeUser(e) {
        setUser(e.target.value);
    }

    function AddAdmin(e) {

        console.log(type);
        axios.post('http://localhost:5000/signup', { first, last, address, city_id, user_name, password, email, type }).then(
            (res) => {
                console.log(res.data);
                if (res.data == 'email already in use') {
                    return;
                }
                else {
                    return;
                }
            }
        ).catch(err => console.log(err));
    }
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >Online Book Store</Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="signup">
                <Row>
                    <Col>
                        <h1>Add New Admin</h1>
                    </Col>

                    <Col>
                        <Form>
                            <Form.Label><h2>Information</h2></Form.Label>
                            <Form.Group className="mb-3" controlId="Email">

                                <Form.Control type="email" placeholder="Email" onChange={changeEmail} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Password">

                                <Form.Control type="password" placeholder="Password" onChange={changePassword} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Fname">

                                <Form.Control type="text" placeholder="First Name" onChange={changeFirst} />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Lname">

                                <Form.Control type="text" placeholder="Last Name" onChange={changeLast} />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">

                                <Form.Control type="text" placeholder="Address" onChange={changeAddress} />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="user">

                                <Form.Control type="text" placeholder="User Name" onChange={changeUser} />

                            </Form.Group>
                            <Form.Select className="city mt-3" aria-label="Default select example" onChange={changeCity}>
                                {
                                    cities.map(city => (
                                        <option value={city.id}>{city.name} </option>
                                    ))
                                }
                            </Form.Select>


                            <Button className variant="dark mt-3" onClick={AddAdmin}> Add </Button>
                        </Form>
                    </Col>

                </Row>
            </Container>

        </Fragment>
    )
}

export default Superadmin
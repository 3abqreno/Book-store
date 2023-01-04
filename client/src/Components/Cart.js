import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Card, Button, Form, Container, Col } from 'react-bootstrap'


function Cart() {
    if(localStorage.length==0)
    window.location.href = "/";
    const userData = JSON.parse(localStorage.getItem("user"));
    if(userData.type==1||userData.type==0)
    window.location.href = "/login";
    const [id,setID] =useState(userData.id) ;
    const [ order_id, setorder_id ] = useState(0);
    const [coupon_code, setCode] = useState('')
    const [orderItems, setOrderItem] = useState([]);
    const [price, setPurchase] = useState(0);
    const [totalPrice, setTotal] = useState(0);
    const [code, setOrderCoupon] = useState('');

useEffect(()=>{
    // console.log(order_id);
    axios.get(`http://localhost:5000/orders/${order_id}`).then((res) => {
        setOrderItem(res.data);
        console.log(res.data);
        let sum = 0
        res.data.map(orderItem => {
            sum = sum + (orderItem.quantity * orderItem.purchase_price);
        })
        console.log(sum)
        setPurchase(sum);
        setTotal(sum);
    }).catch((err) => console.log(err));
},[order_id])

    useEffect(() => {
        axios
        .post(`http://localhost:5000/userOrder`, { id })
        .then((res) => {
          console.log(res.data.id);
          setorder_id(res.data.id);
        })
        .catch((err) => console.log(err));
    }, [id]);
    ///applyCoupon
    function applyCoupon(e) {

        axios.post(`http://localhost:5000/applyCoupon`, { coupon_code }).then((res) => {
            //setOrderItem(res.data);
            if (res.data == -1) {
                setPurchase(totalPrice);
                return;
            }

            setOrderCoupon(coupon_code);

            if (res.data.is_relative == 0) {
                if (totalPrice < res.data.discount) {
                    setPurchase(1) //mablagh ramzy
                }
                else
                    setPurchase(totalPrice - res.data.discount);
            }
            else {

                setPurchase(Math.ceil(totalPrice - (res.data.discount * totalPrice) / 100.0))
            }

            console.log(res.data);
        }).catch((err) => console.log(err));
    }
    function changeCouponCode(e) {
        setCode(e.target.value)
    }

    function SubmitOrder(e) {
        if (price == 0) {
            return
        }


        if (totalPrice == price) {
            setOrderCoupon('')
        }
        axios.post(`http://localhost:5000/makeOrder`, { code, order_id, price }).then((res) => {
            //setOrderItem(res.data);
            console.log(res.data);
            if (res.data !== 'empty cart' || res.data !== 'wrong coupon') {
                window.location.href = '/home'
            }

        }).catch((err) => console.log(err));
    }
    return (

        <div>
            <div className="container mt-4">
                <div className='row'>
                    {
                        orderItems.map(orderItem => {
                            return (
                                <div className="cards">
                                    <div className="col-2">
                                        <Card className="course-card">
                                            <Card.Img variant="top" src={orderItem.image}></Card.Img>
                                            <Card.Body>
                                                <Card.Title>{orderItem.title}</Card.Title>
                                                {orderItem.quantity}

                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> {/* ./row*/}
            </div>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                        <h5>Enter Your Coupon here..</h5>
                    </Form.Label>
                    <Container className="c1">
                        <Row>
                            <Col>
                                <Form.Control
                                    className="prom_text"
                                    type="string"
                                    maxLength={6}
                                    placeholder="Apply coupon"
                                    onChange={changeCouponCode}
                                />
                            </Col>
                            <Col>
                                <Button variant="dark" onClick={applyCoupon}>
                                    Apply
                                </Button>
                            </Col>


                        </Row>

                    </Container>
                    <Form.Text className="text-muted">
                        Your Coupon must not exceed 6 characters/numbers
                    </Form.Text>


                </Form.Group>
                <h1>{price}</h1>
                <Button variant="dark" onClick={SubmitOrder}>
                    Submit Order
                </Button>


            </Form>
        </div>
    )
}

export default Cart
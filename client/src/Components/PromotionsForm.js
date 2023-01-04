import React, { Fragment } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/prom_bg.css'
function Promotions() {
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >Coupons</Navbar.Brand>
            </Container>
        </Navbar>
            <Container className="CouponForm">
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label><h5>Enter Your Coupon here..</h5></Form.Label>
        <Container className="c1">
        <Form.Control className="prom_text"  type="string"  maxLength={6} placeholder="Enter coupon" />
        </Container>
        <Form.Text className="text-muted">
          Your Coupon must be 6 characters/numbers
        </Form.Text>
      </Form.Group>

      <Button variant="dark" type="submit">
       Apply
      </Button>
    </Form>
                    </Container>
                    
        </Fragment>
    )
}

export default Promotions
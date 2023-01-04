import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../CSS/StoresSignUpForm.css'


function StoresSignUpForm() {
    return (
        <Fragment>
            <Container className="mt-3 vh-100">
                <Row>
                    <Col>
                        <h1>Unlock a new revenue stream</h1>
                        <p>Uber’s global platform gives you the flexibility, visibility and customer insights you need to connect with more customers. Partner with us today.</p>
                    </Col>

                    <Col>
                        <Form>
                            <Form.Label>Get Started</Form.Label>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">

                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>

                </Row>
            </Container>

        </Fragment>
    )
}

export default StoresSignUpForm
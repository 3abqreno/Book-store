import React from 'react'
import { Container, Col, Row, } from 'react-bootstrap'
import GetStarted from '../Images/GetStarted.jpg'
function StoresStartingSteps() {
    return (
        <Container className='mt-3'>
            <Row>
                <Col>
                    <img src={GetStarted} alt="failed" />
                </Col>
                <Col>
                    <h1>Get started in just 3 steps
                    </h1>
                    <ol>
                        <li>Tell us about your store.</li>
                        <li>Upload your available books.</li>
                        <li>Access Store Dashboard and go live!</li>
                    </ol>
                </Col>
            </Row>
        </Container>
    )
}

export default StoresStartingSteps
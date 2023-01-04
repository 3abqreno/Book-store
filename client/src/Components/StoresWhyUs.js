import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import CustomersOrder from '../Images/CustomersOrder.svg'
import YouPrepare from '../Images/YouPrepare.svg'
import DeliveryPeopleArrive from '../Images/DeliveryPeopleArrive.svg'
function StoresWhyUs() {
    return (
        <Container>
            <Row>
                <Col><h1>Why Uber Eats</h1></Col>
            </Row>
            <Row className='mt-3'>
                <Col><p>Deliver your way</p></Col>
                <Col><p>Boost your visibility
                </p></Col>
                <Col><p>Connect with customers
                </p></Col>
            </Row>
            <Row>
                <Col><p>Our offerings are flexible so you can customize them to your needs. Get started with your delivery people or connect with delivery people through the Uber platform.</p></Col>
                <Col><p>Stand out with in-app marketing to reach even more customers and increase sales.
                </p></Col>
                <Col><p>Turn customers into regulars with actionable data insights, respond to reviews or offer a loyalty program.
                </p></Col>
            </Row>

            <Row>
                <Col><h1>How Uber Eats works for restaurant partners
                </h1></Col>
            </Row>
            <Row className='mt-3'>
                <Col><p>Customers order</p></Col>
                <Col><p>You prepare
                </p></Col>
                <Col><p>Delivery partners arrive

                </p></Col>
            </Row>
            <Row>
                <Col><img src={CustomersOrder} alt="fail" /></Col>
                <Col> <img src={YouPrepare} alt="fail" /> </Col>
                <Col> <img src={DeliveryPeopleArrive} alt="fail" /> </Col>
            </Row>
            <Row>
                <Col><p>A customer finds your restaurant and places an order through the Uber Eats app.</p></Col>
                <Col><p>Your restaurant accepts and prepares the order.               </p></Col>
                <Col><p>Delivery people using the Uber platform pick up the order from your restaurant, then deliver it to the customer.</p></Col>
            </Row>
        </Container>
    )
}

export default StoresWhyUs
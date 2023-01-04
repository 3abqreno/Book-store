import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BidandSellBooks from '../Images/BidandSellBooks.png'
function GoToSellBidPages() {
    return (
        <Fragment>

            <Container className="mt-3 vh-50">
                <Row>
                    <img class='img-fluid w-100' src={BidandSellBooks} alt="" />
                    <Col>
                        <h1>Make Some Revenue By Selling Your Used Books</h1>

                    </Col>

                    <Col>

                        <Button variant="dark">Sell</Button>
                    </Col>
                    <Col>

                        <Button variant="success">Bid</Button>
                    </Col>

                </Row>
            </Container>

        </Fragment>
    )
}

export default GoToSellBidPages
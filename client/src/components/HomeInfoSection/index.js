import React from 'react';
import './style.css';
import HomeInfoCard from './HomeInfoCard';
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaSearchDollar } from "react-icons/fa";
import { Col, Row } from 'react-bootstrap';

const HomeInfoSection = (props) => {

    return (
        <div className="home-info-section-container">
            <Row>
                <Col>
                    <HomeInfoCard
                        icon={<LiaShippingFastSolid />}
                        title="Fast and Free Shipping"
                        body="We offer expedited shipping for orders over $50"
                    >
                    </HomeInfoCard>
                </Col>
                <Col>
                    <HomeInfoCard
                        icon={<RiSecurePaymentLine />}
                        title="Secure Payments"
                        body="Every payment method is safe and secure"
                    >
                    </HomeInfoCard>
                </Col>
            </Row>
            <Row>
                <Col>
                    <HomeInfoCard
                        icon={<MdOutlineSupportAgent />}
                        title="Top-notch Support"
                        body="24/7 online support from real people"
                    >
                    </HomeInfoCard>
                </Col>
                <Col>
                    <HomeInfoCard
                        icon={<FaSearchDollar />}
                        title="Pricematching"
                        body="See a game on our site more expensive than other major stores? Let us know and we may price match"
                    >
                    </HomeInfoCard>
                </Col>
            </Row>




        </div>
    );
};

export default HomeInfoSection;

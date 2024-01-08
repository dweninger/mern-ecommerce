import React from 'react';
import Layout from '../../components/Layout';
import { Carousel } from 'react-bootstrap';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';

/**
 * @author
 * @function HomePage
 */

const HomePage = (props) => {
    return (
        <Layout>
            <div className="outter-carousel-container">
                <div className="carousel-container">
                    <Carousel className="custom-carousel" indicators={false}>
                        <Carousel.Item>
                            <a href="/">
                                <img
                                    className="d-block w-100"
                                    src={generatePublicUrl("Daily-Deal_Slider.jpg")}
                                    alt="First slide"
                                />
                            </a>

                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="/">
                                <img
                                    className="d-block w-100"
                                    src={generatePublicUrl("12-11-2023_Haba-Games_Slider.jpg")}
                                    alt="Second slide"
                                />
                            </a>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href="/">
                                <img
                                    className="d-block w-100"
                                    src={generatePublicUrl("12-19-2023_Sweet-Mess_Slider.jpg")}
                                    alt="Third slide"
                                />
                            </a>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </Layout>
    )

}

export default HomePage
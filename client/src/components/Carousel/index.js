import React from 'react'
import { Carousel } from 'react-bootstrap';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';


const HomeCarousel = (props) => {
    return (
        <div className="outter-carousel-container">
            <div className="carousel-container">
                <Carousel className="custom-carousel">
                    <Carousel.Item>
                        <a href="/">
                            <img
                                className="d-block w-100"
                                src={generatePublicUrl("daily-deals.png")}
                                alt="First slide"
                            />
                        </a>

                    </Carousel.Item>
                    <Carousel.Item>
                        <a href="/">
                            <img
                                className="d-block w-100"
                                src={generatePublicUrl("collection.png")}
                                alt="Second slide"
                            />
                        </a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a href="/">
                            <img
                                className="d-block w-100"
                                src={generatePublicUrl("featured-game.png")}
                                alt="Third slide"
                            />
                        </a>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default HomeCarousel
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeCard from '../HomeCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';

const CardCarousel = (props) => {
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
        dispatch(getProductsBySlug("Board-Games"));
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        if (window.innerWidth <= 540) {
            setSlidesToShow(2);
        } else if (window.innerWidth <= 768) {
            setSlidesToShow(3);
        } else if (window.innerWidth <= 992) {
            setSlidesToShow(4);
        } else {
            setSlidesToShow(5);
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
    };

    function CustomNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "darkgray", borderRadius: "50%", }}
                onClick={onClick}
            />
        );
    }

    function CustomPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "darkgray", borderRadius: "50%", }}
                onClick={onClick}
            />
        );
    }

    return (
        <div className="card-carousel-container">
            <div className="slider-container">
                <Slider {...settings} className="item-slider">
                    {product.products.map((product, index) => (
                        <HomeCard key={index} {...product} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CardCarousel;

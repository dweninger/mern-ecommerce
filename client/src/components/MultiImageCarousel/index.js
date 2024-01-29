import React, { useState } from 'react';
import Slider from 'react-slick';
import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { generatePublicUrl } from '../../urlConfig';

const MultiImageCarousel = ({
    images,
    onImageClick
}) => {

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!images || !Array.isArray(images)) {
        return null;
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 0,
        slidesToShow: images.length >= 4 ? 4 : images.length,
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

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        onImageClick(index);
    };

    return (
        <div className="slider-container multi-image-carousel-container">
            {images.length > 0 && (
                <Slider {...settings} className="item-slider">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            className={`carousel-image ${selectedImageIndex === index ? 'selected-img' : ''}`}
                            onClick={() => handleImageClick(index)}
                            src={generatePublicUrl(image.img)}
                        />
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default MultiImageCarousel;

import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaRegHeart, FaPlus } from 'react-icons/fa';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

const ItemCard = ({
    name,
    slug,
    _id,
    price,
    offer,
    quantity,
    productPictures,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const prodUrl = `${slug}/${_id}`

    const handleImageHover = (index) => {
        // Switch to the next image if it exists
        if (index < productPictures.length - 1) {
            setCurrentImageIndex(index + 1);
        } else {
            // Reset to the first image when mouse leaves
            setCurrentImageIndex(0);
        }
    };

    return (
        <div className="home-card">
            <div className="home-card-img">
                <a href={prodUrl}>
                    <img
                        src={generatePublicUrl(productPictures[currentImageIndex].img)}
                        onMouseOver={() => handleImageHover(currentImageIndex)}
                        onMouseLeave={() => setCurrentImageIndex(0)} // Reset to the first image on mouse leave
                    />
                </a>
            </div>
            <div>
                <div className="home-card-title">
                    <a href={prodUrl}>{name}</a>
                </div>
                <div className="home-price-container">
                    <span className="home-our-price-value">
                        $<span>{offer ? offer.toFixed(2) : price.toFixed(2)}</span>
                    </span>
                </div>
                <div className="home-buttons-container">
                    <Button className="home-button home-add-to-cart-button button">+ Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;

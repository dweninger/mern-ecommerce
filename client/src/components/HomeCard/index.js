import React from 'react';
import { Button } from 'react-bootstrap';
import { FaRegHeart, FaPlus } from 'react-icons/fa';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

const rating = 4;
const HomeCard = ({
    name,
    slug,
    price,
    offer,
    quantity,
    productPictures,
}) => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;

    return (
        <div className="home-card">
            <div className="home-card-img">
                <a href={slug}><img src={generatePublicUrl(productPictures[0].img)} /></a>
            </div>
            <div>
                <div className="home-card-title">
                    <a href={slug}>{name}</a>
                </div>
                <div className="home-price-container">
                    <span className="home-our-price">Our Price:</span>
                    <span className="home-our-price-value">
                        $<span>{offer ? offer.toFixed(2) : price.toFixed(2)}</span>
                    </span>
                </div>
                <div className="home-buttons-container">
                    <Button className="home-button home-add-to-cart-button button">Add to Cart</Button>
                    <Button className="home-button home-add-to-wishlist-button button">
                        <FaRegHeart className="home-add-to-wishlist-heart" />
                        <FaPlus className="home-add-to-wishlist-plus" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;

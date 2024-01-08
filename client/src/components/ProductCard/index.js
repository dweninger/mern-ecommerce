import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import { FaRegStar, FaRegHeart, FaPlus } from 'react-icons/fa';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
const rating = 4;
const ProductCard = ({
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
        <Card className="card">
            <div className="card-img">
                <a href={slug}><Card.Img variant="top" src={generatePublicUrl(productPictures[0].img)} /></a>
            </div>
            <Card.Body>
                <Card.Title className="card-title">
                    <a href={slug}>{name}</a>
                </Card.Title>
                <div className="star-container">
                    {[...Array(filledStars)].map((_, i) => (
                        <AiFillStar key={i} />
                    ))}
                    {[...Array(remainingStars)].map((_, i) => (
                        <FaRegStar key={i} />
                    ))}
                </div>
                <div>
                    <span className="price-info">
                        Retail Price: ${price.toFixed(2)}
                    </span>
                    <span className="our-price">Our Price:</span>
                    <span className="our-price-value">
                        $<span>{offer ? offer.toFixed(2) : price.toFixed(2)}</span>
                    </span>
                </div>
                <div className="stock-status">
                    <span>{quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                <div className="buttons-container">
                    <Button className="add-to-cart-button button">Add to Cart</Button>
                    <Button className="add-to-wishlist-button button">
                        <FaRegHeart className="add-to-wishlist-heart" />
                        <FaPlus className="add-to-wishlist-plus" />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;

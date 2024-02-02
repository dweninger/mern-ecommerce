import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { generatePublicUrl } from '../../urlConfig';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { addToCart } from '../../actions';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageHover = (index) => {
        if (index < productPictures.length - 1) {
            setCurrentImageIndex(index + 1);
        } else {
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
                        onMouseLeave={() => setCurrentImageIndex(0)}
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
                    <Button
                        className="home-button home-add-to-cart-button button"
                        onClick={() => {
                            const img = productPictures[0].img;
                            dispatch(addToCart({ _id, name, price, img }, quantity));
                            navigate('/cart');
                        }}
                    >+ Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;

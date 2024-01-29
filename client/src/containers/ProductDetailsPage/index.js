import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import { useParams, useNavigate } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import QuantityInput from '../../components/QuantityInput';
import { Button } from 'react-bootstrap';
import MultiImageCarousel from '../../components/MultiImageCarousel';
import { FaStar } from "react-icons/fa";
import { addToCart } from '../../actions';


/**
 * @author
 * @function ProductDetailsPage
 */

const ProductDetailsPage = (props) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector(state => state.product);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const productPictures = product.productDetails.productPictures;
    const [quantity, setQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(product.productDetails.offer);

    useEffect(() => {
        const payload = {
            params: {
                productId
            }
        }

        dispatch(getProductDetailsById(payload));
    }, [productId]);

    useEffect(() => {
        if (product.productDetails) {
            const newSubtotal = (product.productDetails.offer * quantity).toFixed(2);
            setSubtotal(newSubtotal);
        }
    }, [quantity, product.productDetails]);

    const handleQuantityChange = newQuantity => {
        setQuantity(newQuantity);
    };

    const handlePictureClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <Layout>
            <div className="product-details-page-container">
                <div className="product-details-container container">
                    <div className="row">
                        {productPictures && productPictures.length > 0 && (
                            <>
                                <div className="col-md-5">
                                    <div className="product-details-image">
                                        <img src={generatePublicUrl(productPictures[currentImageIndex].img)} />
                                    </div>
                                    <div className="product-pictures">
                                        <MultiImageCarousel
                                            images={productPictures}
                                            onImageClick={handlePictureClick}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="product-details col-md-7">
                            <span className="product-name">{product.productDetails.name}</span>
                            <div className="reviews">
                                <div className="review-star-box">
                                    <span>4.3</span>
                                    <span> <FaStar className="star-icon" /></span>
                                </div>
                                <a href="#" className="ratings-link">2,457 Ratings & 238 Reviews</a>

                            </div>
                            <table className="table table-borderless product-details-table">
                                <tbody>
                                    <tr>
                                        <th>Availability</th>
                                        <td>In stock</td>
                                    </tr>
                                    <tr>
                                        <th>Publisher</th>
                                        <td>Tabletop Games</td>
                                    </tr>
                                    <tr>
                                        <th>SKU</th>
                                        <td>{product.productDetails._id}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="product-price">
                                {
                                    product.productDetails && product.productDetails.offer ? `$${product.productDetails.offer.toFixed(2)}` : "$"
                                }
                            </div>
                            <div className="details-order-quantity">
                                <span className="quantity-label">Quantity:</span>
                                <QuantityInput
                                    className="product-quantity-input"
                                    quantity={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                            <div className="product-subtotal">Subtotal: ${subtotal}</div>
                            <Button
                                className="home-button home-add-to-cart-button button product-details-cart-button"
                                onClick={() => {
                                    const { _id, name, price } = product.productDetails;
                                    const img = product.productDetails.productPictures[0].img;
                                    dispatch(addToCart({ _id, name, price, img }));
                                    navigate('/cart');
                                }}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="header-banner">
                    <div className="banner-content">
                        <span className="banner-title">Description</span>
                    </div>
                    <img className="triangle-cutout" src={generatePublicUrl("ribbon.png")} />
                </div>
                <div className="product-details-description-container">
                    <div className="row">
                        <div className="col-md-3">
                            <table className="table table-striped table-bordered description-table">
                                <tbody>
                                    <tr>
                                        <td>Number of Players</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>Playtime</td>
                                        <td>20-40 Min</td>
                                    </tr>
                                    <tr>
                                        <td>Ages</td>
                                        <td>8+</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-9">
                            <div className="description">
                                {product.productDetails.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )

}

export default ProductDetailsPage
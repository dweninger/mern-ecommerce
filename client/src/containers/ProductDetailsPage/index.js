import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import { useParams } from 'react-router-dom';
import { generatePublicUrl } from '../../urlConfig';
import QuantityInput from '../../components/QuantityInput';
import { Button } from 'react-bootstrap';
import MultiImageCarousel from '../../components/MultiImageCarousel';
import Zoom from 'react-image-zoom';
import ProductImageZoom from '../../components/ProductImageZoom';


/**
 * @author
 * @function ProductDetailsPage
 */

const ProductDetailsPage = (props) => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const productPictures = product.productDetails.productPictures;
    const [quantity, setQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(product.productDetails.offer);

    const zoomAttrs = { width: 360, height: 500, img: productPictures && productPictures.length > 0 ? generatePublicUrl(productPictures[currentImageIndex].img) : '' };

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
                                        {/* <ReactImageZoom {...zoomAttrs} /> */}
                                        <img src={generatePublicUrl(productPictures[currentImageIndex].img)} />
                                        {/* <ProductImageZoom imageSrc={generatePublicUrl(productPictures[currentImageIndex].img)} /> */}
                                        {/* <Zoom
                                            img={generatePublicUrl(productPictures[currentImageIndex].img)}
                                            zoomScale={3}
                                            width={400}
                                            height={500}
                                        /> */}
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
                            <div className="product-price">${product.productDetails.offer}</div>
                            <div className="details-order-quantity">
                                <span className="quantity-label">Quantity:</span>
                                <QuantityInput
                                    className="product-quantity-input"
                                    quantity={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>
                            <div className="product-subtotal">Subtotal: ${subtotal}</div>
                            <Button className="home-button home-add-to-cart-button button product-details-cart-button">Add to Cart</Button>
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
                    <div class="row">
                        <div class="col-md-3">
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
                        <div class="col-md-9">
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
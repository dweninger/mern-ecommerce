import React, { useEffect } from 'react'
import './style.css';
import { Row, Col } from 'react-bootstrap';
import { generatePublicUrl } from '../../urlConfig';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import { useParams } from 'react-router-dom';
import HomeCard from '../HomeCard';

/**
 * @author
 * @function HomeItemSection
 */

const HomeItemSection = (
    {
        title,
        viewUrl,
        products,
    }
) => {
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsBySlug("Board-Games"));
    }, []);
    return (
        <div className="item-section-container">
            <div className="header-banner">
                <div className="banner-content">
                    <span className="banner-title">{title}</span>
                    <a className="view-all" href={viewUrl}>View All</a>
                </div>
                <img className="triangle-cutout" src={generatePublicUrl("ribbon.png")} />
            </div>
            <div className="item-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {product.products.map((product, index) => (
                    <HomeCard key={index} {...product} />
                ))}
            </div>
        </div>
    )
}

export default HomeItemSection
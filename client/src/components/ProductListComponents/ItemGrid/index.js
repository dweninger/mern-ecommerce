import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions';
import { useParams } from 'react-router-dom';
import './style.css';
import ItemCard from '../../ItemCard';

/**
 * @author
 * @function ItemGrid
 */

const ItemGrid = (props) => {

  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);

  return (
    <div className="item-grid-container">
      {product.products.map((product, index) => (
        <>
          <div className="item-grid-card">
            <ItemCard key={index} {...product} />
          </div>
          {index % 4 === 3 && <div className="row-divider"></div>}
        </>
      ))}
    </div>
  )
}

export default ItemGrid

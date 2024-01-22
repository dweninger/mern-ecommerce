import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import { useParams } from 'react-router-dom';
import './style.css';
import ItemCard from '../../components/ItemCard';

/**
 * @author
 * @function ProductListPage
 */

const ProductListPage = (props) => {

  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);

  return (
    <Layout>
      <div className="product-list-item-container">
        {product.products.map((product, index) => (
            <div className="product-list-item-card">
              <ItemCard key={index} {...product} style={{}} />
            </div>
            
        ))}
      </div>

    </Layout>
  )
}

export default ProductListPage

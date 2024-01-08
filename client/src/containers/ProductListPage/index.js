import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import { useParams } from 'react-router-dom';
import './style.css';
import ProductCard from '../../components/ProductCard';

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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {product.products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>

    </Layout>
  )
}

export default ProductListPage

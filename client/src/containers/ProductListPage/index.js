// ProductListPage.jsx

import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import { useParams } from 'react-router-dom';
import './style.css';
import ItemGrid from '../../components/ProductListComponents/ItemGrid';
import FilterBar from '../../components/ProductListComponents/FilterBar';
import SortBar from '../../components/ProductListComponents/SortBar';

const ProductListPage = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);

  return (
    <Layout>
      <div className="product-list-container">
        <div className="filter-bar">
          <FilterBar />
        </div>
        <div className="content-container">
          <div className="category-description">
            Explore endless possibilities with our Board Games Collection,
            where strategy and excitement collide. From classic favorites to
            modern gems, our curated selection offers something for every
            player. Unplug and engage in face-to-face interactions, whether
            you're battling wits, embarking on epic adventures, or enjoying
            family-friendly classics. Elevate your tabletop experience and make
            unforgettable memories with our premium board games.
          </div>
          <div className="sort-bar">
            <SortBar />
          </div>
          <div className="item-grid">
            <ItemGrid />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListPage;

import React, { useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import ProductDetailsPage from './containers/ProductDetailsPage';
import { useDispatch } from 'react-redux';
import { isUserLoggedIn } from './actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/:slug" element={<ProductListPage />} />
          <Route path="/:productSlug/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

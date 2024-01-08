import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate, Outlet, Route as RoutedRoute, useRoutes } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/:slug" element={<ProductListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

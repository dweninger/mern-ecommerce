import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import PrivateRoutes from './components/HOC/PrivateRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Category />} path="/category" />
          <Route element={<Products />} path="/products" />
          <Route element={<Orders />} path="/orders" />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

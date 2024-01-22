import React from 'react';
import Header from '../HeaderComponents/Header';
import MenuHeader from '../HeaderComponents/MenuHeader';
import Footer from '../Footer';

/**
 * @author
 * @function Layout
 */

const Layout = (props) => {
  return (
    <>
        <Header />
        <MenuHeader />
        {props.children}
        <Footer />
    </>
  )
}

export default Layout

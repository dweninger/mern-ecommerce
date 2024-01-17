import React from 'react';
import Header from '../HeaderComponents/Header';
import MenuHeader from '../HeaderComponents/MenuHeader';

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
    </>
  )
}

export default Layout

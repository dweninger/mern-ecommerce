import React from 'react';
import Header from '../Header';
import { Container } from 'react-bootstrap';

/**
 * @function Layout
 t
 * @param {} props 
 * @returns 
 */

const Layout = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
    )
}

export default Layout;
import React from 'react';
import Layout from '../../components/Layout';
import HomeCarousel from '../../components/Carousel';
import HomeItemSection from '../../components/HomeItemSection';


/**
 * @author
 * @function HomePage
 */

const HomePage = (props) => {
    return (
        <Layout>
            <HomeCarousel />
            <HomeItemSection title="Best Sellers" viewUrl="/" />
            <HomeItemSection title="Deals" viewUrl="/" />
        </Layout>
    )

}

export default HomePage
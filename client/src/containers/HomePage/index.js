import React from 'react';
import Layout from '../../components/Layout';
import HomeCarousel from '../../components/Carousel';
import HomeItemSection from '../../components/HomeItemSection';
import CardCarousel from '../../components/CardCarousel';
import HeaderBanner from '../../components/HeaderBanner';


/**
 * @author
 * @function HomePage
 */

const HomePage = (props) => {
    return (
        <Layout>
            <HomeCarousel />
            <HeaderBanner title="Today's Deals" viewUrl="/" />
            <CardCarousel />
        </Layout>
    )

}

export default HomePage
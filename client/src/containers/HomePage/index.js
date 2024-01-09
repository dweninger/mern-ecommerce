import React from 'react';
import Layout from '../../components/Layout';
import HomeCarousel from '../../components/Carousel';
import HomeItemSection from '../../components/HomeItemSection';
import CardCarousel from '../../components/CardCarousel';


/**
 * @author
 * @function HomePage
 */

const HomePage = (props) => {
    return (
        <Layout>
            <HomeCarousel />
            <CardCarousel title="Today's Deals" viewUrl="/"/>
        </Layout>
    )

}

export default HomePage
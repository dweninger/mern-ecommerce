import React from 'react';
import Layout from '../../components/Layout';
import HomeCarousel from '../../components/Carousel';
import CardCarousel from '../../components/HomeFeaturedComponents/CardCarousel';
import HeaderBanner from '../../components/HomeFeaturedComponents/HeaderBanner';
import './style.css';
import HomeInfoSection from '../../components/HomeInfoSection';
import Footer from '../../components/Footer';


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
            <HeaderBanner title="New Releases" viewUrl="/" />
            <CardCarousel />
            <hr className="horz-line" />
            <HomeInfoSection />
        </Layout>
    )

}

export default HomePage
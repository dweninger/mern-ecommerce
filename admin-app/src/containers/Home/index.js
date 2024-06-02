import React from 'react'
import Layout from '../../components/Layout'
import './style.css';

/**
* @author
* @function Home
**/

export const Home = (props) => {
  return (
    <Layout sidebar>


      <div className="bg-white p-5 mb-4 mx-5">
        <h1 className="text-center mb-4">Welcome to Tabletop Treasures Admin Dashboard</h1>
        <p className="text-center px-5 mx-4">This dashboard is used to update the inventory of Tabletop Treasures' website as well as updating orders.</p>
      </div>
    </Layout>
  )

}

export default Home;
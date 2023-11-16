import React from 'react'
import Layout from '../../components/Layout'

/**
* @author
* @function Home
**/

export const Home = (props) => {
  return(
    <Layout>
      <div className="bg-white p-5 mb-4 mx-5">
        <h1 className="text-center mb-4">Welcome to Admin Dashboard</h1>
        <p className="text-center px-5 mx-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
    </div>
    </Layout>
   )

 }

 export default Home;
import React from 'react';
import Layout from '../../components/Layout';
import './style.css';
import { useSelector } from 'react-redux';

/**
 * @author
 * @function OrderConfirmationPage
 */

const OrderConfirmationPage = (props) => {
    const order = useSelector(state => state.order);

    return (
        <Layout>
            <div className="order-confirmation-container">
                <h2>Your Order Has Been Confirmed!</h2>
                <div className="order-details">
                    <h3>Order Details</h3>
                    <div>
                        <strong>Order ID:</strong> {order.orderId} 
                    </div>
                    <div>
                        <strong>Order Total:</strong> ${order.orderTotal.toFixed(2)}
                    </div>
                    <a className="btn btn-primary" href="/">Return Home</a>
                </div>
            </div>
        </Layout>
    )

}

export default OrderConfirmationPage
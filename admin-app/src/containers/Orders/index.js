import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateOrder
} from '../../actions';
import MyModal from '../../components/UI/Modal';
import './style.css';

/**
* @author
* @function Orders
**/

const Orders = (props) => {
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderDetailModal, setOrderDetailModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');

  const showOrderDetailsModal = (order) => {
    setOrderDetails(order);
    setOrderStatus(order.orderStatus);
    setOrderDetailModal(true);
  }

  const handleCloseOrderDetailsModal = () => {
    dispatch(updateOrder(orderDetails._id, orderStatus))
    .then(() => {
      setOrderDetails({ ...orderDetails, orderStatus });
      setOrderDetailModal(false);
    });
  }

  const handleHideOrderDetailsModal = () => {
    setOrderDetailModal(false);
  }

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  }

  const renderOrderDetailsModal = () => {

    if (!orderDetails) {
      return null;
    }

    const statusOptions = ['Placed', 'Pending', 'Shipped', 'Completed', 'Cancelled'];

    return (
      <MyModal
        show={orderDetailModal}
        handleClose={handleCloseOrderDetailsModal}
        handleHide={handleHideOrderDetailsModal}
        modalTitle={'Order Details'}
        size="lg"
      >

        <Row>
          <Col md="6">
            <label className="key">#</label>
            <p className="value">{orderDetails._id}</p>
          </Col>
          <Col md="6">
            <label className="key">User</label>
            <p className="value">{orderDetails.user}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Status</label>
            <Form.Control as="select" value={orderStatus} onChange={handleStatusChange}>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col md="6">
            <label className="key">Total</label>
            <p className="value">${orderDetails.orderTotal}</p>
          </Col>
        </Row>
        <Row>
          <Col md="3 ">
          </Col>
          <Col md="6">
            <label className="key">Updated</label>
            <p className="value">{orderDetails.createdAt}</p>
          </Col>
        </Row>

      </MyModal>
    );
  }

  const renderOrders = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name/User</th>
            <th>Total</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {
            order.orders.length > 0 ?
              order.orders.map(order =>
                <tr className="order-row" onClick={() => showOrderDetailsModal(order)} key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.user ? order.user : order.guest.fullName}</td>
                  <td>{order.orderTotal}</td>
                  <td>{order.createdAt}</td>
                </tr>
              ) : null
          }
        </tbody>
      </Table>
    )
  }

  return(
    <Layout sidebar>
        <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Orders</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {renderOrders()}
          </Col>
        </Row>
      </Container>
      {renderOrderDetailsModal()}
    </Layout>
   )

 }

export default Orders;

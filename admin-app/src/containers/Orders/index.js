import React from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

/**
* @author
* @function Orders
**/

const Orders = (props) => {
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();

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
                <tr key={order._id}>
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
    </Layout>
   )

 }

export default Orders;

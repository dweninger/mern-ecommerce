import React from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';

/**
* @author
* @function Login
**/

export const Login = (props) => {
  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Input
                label="Email Address"
                placeholder="Email Address"
                value=""
                type="email"
                onChange={() => { }}
              />

              <Input
                label="Password"
                placeholder="Password"
                value=""
                type="password"
                onChange={() => { }}
              />
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default Login;
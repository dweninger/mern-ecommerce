import React from 'react'
import Layout from '../../components/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';

/**
* @author
* @function Register
**/

export const Register = (props) => {
  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={{ span: 6 }}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value=""
                    type="text"
                    onChange={() => { }}
                  />
                </Col>
                <Col md={{ span: 6 }}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value=""
                    type="text"
                    onChange={() => { }}
                  />
                </Col>
              </Row>
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
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default Register;
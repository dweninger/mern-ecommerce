import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
* @author
* @function Login
**/

export const Login = (props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {

    e.preventDefault();
    
    const user = {
      email,password,
    }

    dispatch(login(user));
  }

  if (auth.authenticate) {
    return <Navigate to="/" />
  }

  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email Address"
                placeholder="Email Address"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
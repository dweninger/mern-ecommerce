import React, {useState} from 'react'
import Layout from '../../components/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions';

/**
* @author
* @function Register
**/

export const Register = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const userRegister = (e) => {
    e.preventDefault();
    const user = {
      firstName, lastName, email, password
    }
    dispatch(register(user));
  }

  if (auth.authenticate) {
    return <Navigate to="/" />
  }

  if(user.loading) {
    return <p> Loading...</p>
  }

  return (
    <Layout>
      <Container>
        { user.message }
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userRegister}>
              <Row>
                <Col md={{ span: 6 }}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                </Col>
                <Col md={{ span: 6 }}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => { setLastName(e.target.value) }}
                  />
                </Col>
              </Row>
              <Input
                label="Email Address"
                placeholder="Email Address"
                value={email}
                type="email"
                onChange={(e) => { setEmail(e.target.value) }}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
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
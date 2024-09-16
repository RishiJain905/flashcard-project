import "../register/register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

function Login({}) {
  const [toggleValidation, setToggleValidation] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      check: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container>
      <Row className="loginRow">
        <Col xs={12} md={8} className="loginContainer">
          <Form onSubmit={formik.handleSubmit} className="loginForm">
            <Form.Label as="h2" className="mb-4">
              Log In
            </Form.Label>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                maxLength="50"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></Form.Control>
              {toggleValidation && (
                <span className="error">{formik.errors.email}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></Form.Control>
              {toggleValidation && (
                <span className="error">{formik.errors.password}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Remember Me"
                name="check"
                value={formik.values.check}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group>
                <Form.Text>
                    <a href="#">Forgot Password?</a>
                </Form.Text>
                <Form.Text>
                    <p>Don't have an account? <a href="#">Create One</a></p>
                </Form.Text>
            </Form.Group>
            <Button type="submit" variant="dark">
              <button
                type="button"
                className="dummyButton"
                onClick={() => setToggleValidation(true)}
              >
                Log In
              </button>
            </Button>
          </Form>
          
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

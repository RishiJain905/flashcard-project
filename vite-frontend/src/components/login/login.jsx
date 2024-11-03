import "../register/register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({}) {
  const [toggleValidation, setToggleValidation] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (localStorage.getItem("token")){
       navigate("/dashboard")
    };
  }, [signedIn]);


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
    onSubmit: (values, {setSubmitting, resetForm}) => {
      axios
        .post("http://localhost:5000/api/auth/login", values)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("fname", JSON.stringify(response.data.user.fname));
          localStorage.setItem("lname", JSON.stringify(response.data.user.lname));
          localStorage.setItem("email", JSON.stringify(response.data.user.email));
          console.log(localStorage.getItem("token"));
          console.log(localStorage.getItem("email"));
          setSignedIn(true);

          resetForm();
        })
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false));
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
                    <p>Don't have an account? <Link to="/register">Create One</Link></p>
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

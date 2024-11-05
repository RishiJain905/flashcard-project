import "./register.css";
import { useFormik } from "formik";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { register } from "../../helperFunctions/axiosRequests";
import { useNavigate } from "react-router-dom";

function Register({}) {
  const [toggleValidation, setToggleValidation] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")){
       navigate("/dashboard")
    };
  }, [signedIn]);

  const validationSchema = yup.object().shape({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(
        8,
        "Password must be between 8-12 letters long and contain at least 1 Upper Case Letter, 1 Lower Case Letter, 1 Symbol, 1 Number"
      )
      .max(
        12,
        "Password must be between 8-12 letters long and contain at least 1 Upper Case Letter, 1 Lower Case Letter, 1 Symbol, 1 Number"
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        "Password must be between 8-12 letters long and contain at least 1 Upper Case Letter, 1 Lower Case Letter, 1 Symbol, 1 Number"
      )
      .required("Password is required"),
    conPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please Confirm Your Password"),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      conPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      
      try {
        await axiosMethods.register(values, "register");
        setSignedIn(true);
        resetForm();
      } catch(err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
      
      
    },
  });

  return (
    <Container>
      <Row className="loginRow">
        <Col xs={12} md={8} className="loginContainer">
          <Form onSubmit={formik.handleSubmit} className="loginForm">
            <Form.Label>
              <h2>Register</h2>
            </Form.Label>
            <Row>
              <Col xd={12} md={6}>
                <Form.Group>
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="input"
                    name="fname"
                    maxLength="30"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                  ></Form.Control>
                  {toggleValidation && (
                    <span className="error">{formik.errors.fname}</span>
                  )}
                </Form.Group>
              </Col>
              <Col xd={12} md={6}>
                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="input"
                    name="lname"
                    maxLength="30"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                  ></Form.Control>
                  {toggleValidation && (
                    <span className="error">{formik.errors.lname}</span>
                  )}
                </Form.Group>
              </Col>
            </Row>
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
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="conPassword"
                value={formik.values.conPassword}
                onChange={formik.handleChange}
              ></Form.Control>
              {toggleValidation && (
                <span className="error">{formik.errors.conPassword}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Text>
                <p>
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="dark">
              <button
                type="button"
                className="dummyButton"
                onClick={() => setToggleValidation(true)}
              >
                Register
              </button>
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;

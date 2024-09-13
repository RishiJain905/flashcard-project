import "./register.css";
import { useFormik } from "formik";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Register({}) {
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      password: "",
      conPassword: ""
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="input"
            name="fname"

            value={formik.values.fname}
            onChange={formik.handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="input"
            name="lname"
            value={formik.values.lname}
            onChange={formik.handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="input"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="conPassword"
            value={formik.values.conPassword}
            onChange={formik.handleChange}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default Register;
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import "../../styles/modal.css";


export default function SetModal({ show, setShow, groupsFormik }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const subject = e.target[1].value;
    console.log(title, subject);
    const newGroup = {
      id: Date.now(),
      title: title,
      subject: subject,
      cards: [],
    };
    console.log("Before: " +  JSON.stringify(groupsFormik.values.userGroups));
    groupsFormik.setFieldValue("userGroups", [
      ...groupsFormik.values.userGroups,
      newGroup,
    ]);
    console.log("After: " +  JSON.stringify(groupsFormik.values.userGroups));
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Set</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Set Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter Title" />
                </Form.Group>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Enter Subject" />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

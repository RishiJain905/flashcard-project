import {Modal, Form, Button} from "react-bootstrap";
import "./modal.css";

export default function CardModal({ show, setShow, handleCreate }) {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <h3>Choose Card Type</h3>
        </Modal.Header>
        <Form
          className="modalStyle"
          onSubmit={(e) => {
            handleCreate(e);
            setShow(false);
          }}
        >
          <Form.Control as="select">
            <option value="flashcard">Flashcard</option>
            <option value="mcq">MCQ</option>
            <option value="t/f">True/False</option>
          </Form.Control>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal>
    );
}
import {
  Modal,
  Form,
  Button,
  Container,
  Row,
  Col,
  ModalHeader,
} from "react-bootstrap";
import "./modal.css";
import { useState } from "react";


export default function QuizModal({ show, setShow, cardsFormik, onSubmit }) {
    const [check, setCheck] = useState([true, true, true]);
    const [checkLength, setCheckLength] = useState(3);
  const length = cardsFormik.values.userCards.length;
  function toggleCheck(e) {
        
    if (e.target.checked || checkLength > 1) {
        if (e.target.checked) {
            setCheckLength(checkLength + 1);
        } else {
            setCheckLength(checkLength - 1);
        }
        if (e.target.value === "mastered") {
            setCheck([!check[0], check[1], check[2]]);
        } else if (e.target.value === "unsure") {
            setCheck([check[0], !check[1], check[2]]);
        } else {
            setCheck([check[0], check[1], !check[2]]);
        }
        
    }
    
    
  }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>Select Constraints</Modal.Header>
      <Form className="modalStyle" onSubmit={onSubmit}>
        <Form.Group className="required" controlId="numCards">
          <Form.Label>Select Amount of Cards</Form.Label>
          <Form.Control type="number" placeholder={length} max={length} min={2} required/>
        </Form.Group>
        <Form.Group controlId="timeLimit">
          <Form.Label>Time Limit in Seconds</Form.Label>
          <Form.Control type="number" placeholder="N/A" min={10} max={7200}/>
        </Form.Group>
        <Form.Group controlId="mastery">
          <h3>Filter Cards</h3>
          <Form.Check
            inline
            label="Mastered"
            name="mastery"
            type="checkbox"
            value="mastered"
            id="inline-checkbox-1"
            checked = {check[0]}
            onChange = {toggleCheck}
          />
          <Form.Check
            inline
            label="Unsure"
            name="mastery"
            type="checkbox"
            value="unsure"
            id="inline-checkbox-2"
            checked = {check[1]}
            onChange = {toggleCheck}
          />
          <Form.Check
            inline
            label="Needs Work"
            name="mastery"
            type="checkbox"
            value="needsWork"
            id="inline-checkbox-3"
            checked = {check[2]}
            onChange = {toggleCheck}
          />
        </Form.Group>
        <Button type="submit">Start Quiz</Button>
      </Form>
    </Modal>
  );
}

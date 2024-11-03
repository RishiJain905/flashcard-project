import { Modal, Form, Button } from "react-bootstrap";
import "../../styles/modal.css";
import { useState, useContext } from "react";
import { QuizContext } from "../../../pages/dashboard";
import { addIndex, randomizeCards, filterCards } from "../../../helperFunctions/filterCards";

export default function QuizModal({ show, setShow, cardsFormik }) {
  const {
    displayQuiz,
    setDisplayQuiz,
    setQuizFilters,
    setFilteredCards,
  } = useContext(QuizContext);

  const [check, setCheck] = useState([true, true, true]);
  const [checkLength, setCheckLength] = useState(3);
  const length = cardsFormik.values.userCards.length;

  function toggleCheck(e) {
    console.log(e.target.checked, checkLength);
    if (e.target.checked || checkLength > 1) {
      if (e.target.checked) {
        setCheckLength(checkLength + 1);
      } else {
        setCheckLength(checkLength - 1);
      }
      if (e.target.value === "mastered") {
        setCheck([!check[0], check[1], check[2]]);
      } else if (e.target.value === "intermediate") {
        setCheck([check[0], !check[1], check[2]]);
      } else {
        setCheck([check[0], check[1], !check[2]]);
      }
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    const quizFilters ={
      maxCards: e.target[0].value,
      timeLimit: e.target[1].value,
      mastery: [check[0] && "mastered", check[1] && "intermediate", check[2] && "novice"].filter(Boolean),
    };
    let newCards = addIndex(cardsFormik.values.userCards);
    console.log(newCards, cardsFormik.values.userCards);
    randomizeCards(newCards);
    newCards = filterCards(newCards, quizFilters);
    
    if (newCards.length === 0) {
      alert("No cards meet the criteria");
      return;
    }

    setQuizFilters(quizFilters);
    setFilteredCards(newCards);
    setShow(false);
    setDisplayQuiz(true);
  }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>Select Constraints</Modal.Header>
      <Form className="modalStyle" onSubmit={onSubmit}>
        <Form.Group className="required" controlId="numCards">
          <Form.Label>Select Amount of Cards</Form.Label>
          <Form.Control
            type="number"
            placeholder={length}
            max={length}
            min={2}
            required
          />
        </Form.Group>
        <Form.Group controlId="timeLimit">
          <Form.Label>Time Limit in Seconds</Form.Label>
          <Form.Control type="number" placeholder="N/A" min={10} max={7200} />
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
            checked={check[0]}
            onChange={toggleCheck}
          />
          <Form.Check
            inline
            label="Intermediate"
            name="mastery"
            type="checkbox"
            value="intermediate"
            id="inline-checkbox-2"
            checked={check[1]}
            onChange={toggleCheck}
          />
          <Form.Check
            inline
            label="Novice"
            name="mastery"
            type="checkbox"
            value="novice"
            id="inline-checkbox-3"
            checked={check[2]}
            onChange={toggleCheck}
          />
        </Form.Group>
        <Button type="submit">Start Quiz</Button>
      </Form>
    </Modal>
  );
}

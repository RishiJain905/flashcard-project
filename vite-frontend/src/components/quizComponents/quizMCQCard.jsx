import { Container, Row, Col } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
import { mdiArrowRightBoldBoxOutline } from "@mdi/js";
import { mdiArrowLeftBoldBoxOutline } from "@mdi/js";
import { useRef, useState } from "react";


export default function QuizMCQCard({ className, card, back, setBack, cardsFormik}) {
  const [refresher, setRefresher] = useState(false);
  
  const flip = () => {
    setBack(!back);
  };
  const checkAnswer = (e, index) => {
    e.stopPropagation();
    if (card.answered) {
      return;
    }
    if (index === card.answer) {
      console.log("Correct");
      card.mastery == "novice" ? card.mastery = "intermediate" : card.mastery = "mastered";
      card.correct = true;
    } else {
      card.mastery == "mastered" ? card.mastery = "intermediate" : card.mastery = "novice";
      console.log("Incorrect");
      card.correct = false;
    }
    card.status = "updated";
    card.answered = true;
    cardsFormik.setFieldValue(`userCards.${card.index}.mastery`, card.mastery);
    cardsFormik.setFieldValue(`userCards.${card.index}.status`, card.status);
    setRefresher(!refresher);
  };

  return (
    <>
      {!back && (
        <Container className={"quizCard " + card.mastery + " " + className} onClick={flip}>
          <Row>
            <Col>
              <h3>{card.cardType}</h3>
              <h3>{card.title}</h3>
              <h3>Status: <em>{card.mastery}</em></h3>
              {card.answered && (card.correct ? <h3 style={{color: "green"}}>Correct!</h3> : <h3 style={{color: "red"}}>Incorrect!</h3>)}
            </Col>
          </Row>
          {card.options.map((option, index) =>
            index % 2 === 0 && (
              <Row key={card.id}>
                <Col>
                  <button
                    className={`answerButton ${card.answered ? (index === card.answer ? "answerCorrect" : "answerIncorrect") : ""}`}
                    onClick={(e) => checkAnswer(e, index)}
                  >
                    {option}
                  </button>
                </Col>
                {card.options[index + 1] && (
                  <Col>
                    <button
                      className={`answerButton ${card.answered ? (index + 1 === card.answer ? "answerCorrect" : "answerIncorrect") : ""}`}
                      onClick={(e) => checkAnswer(e, index + 1)}
                    >
                      {card.options[index + 1]}
                    </button>
                  </Col>
                )}
              </Row>
            )
          )}
        </Container>
      )}
      {back && (
        <Container className={"quizCard " + card.mastery} onClick={flip}>
          <Row>
            <Col>
              <h2>Answer</h2>
              <h3>{card.options[card.answer]}</h3>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

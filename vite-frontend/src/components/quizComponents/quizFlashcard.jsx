import { Container, Row, Col } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
import { mdiArrowRightBoldBoxOutline } from "@mdi/js";
import { mdiArrowLeftBoldBoxOutline } from "@mdi/js";
import { useState } from "react";
import "../styles/cards.css";

export default function QuizFlashcard({ className, card, back, setBack, setFieldValue, groupPath }) {
  const flip = () => {
    setBack(!back);
  };
  
  function onClick(e, isCorrect) {
    e.stopPropagation();
    if (isCorrect) {
      card.mastery == "novice"
        ? (card.mastery = "intermediate")
        : (card.mastery = "mastered");
      
    } else {
      card.mastery == "mastered"
        ? (card.mastery = "intermediate")
        : (card.mastery = "novice");
    }
    card.status = "updated";
    setFieldValue(`${groupPath}.${card.index}.mastery`, card.mastery);
    setFieldValue(`${groupPath}.${card.index}.status`, card.status);
    card.answered = true;
    card.correct = isCorrect;
    setBack(!back);
  }
  return (
    <>
      {!back && (
        <Container className={"quizCard " + card.mastery + " " + className} onClick={flip}>
          <Row>
            <Col>
              <h3>{card.title}</h3>
              <h3>
                Status: <em>{card.mastery}</em>
              </h3>
              {card.answered &&
                (card.correct ? (
                  <h3 style={{ color: "green" }}>Correct!</h3>
                ) : (
                  <h3 style={{ color: "red" }}>Incorrect!</h3>
                ))}
            </Col>
          </Row>
        </Container>
      )}
      {back && (
        <Container className={"quizCard " + card.mastery} onClick={flip}>
          <Row>
            <Col>
              <h2>
                <strong>Answer</strong>
              </h2>
              <h3>{card.description}</h3>{" "}
            </Col>
          </Row>
          {!card.answered && (
            <Row>
              <h3>
                <em>Feeling Confident?</em>
              </h3>
              <Col>
                <button
                  className="answerButton"
                  onClick={(e) => onClick(e, true)}
                >
                  I Got That!
                </button>
              </Col>
              <Col>
                <button
                  className="answerButton"
                  onClick={(e) => onClick(e, false)}
                >
                  I Need More Time....
                </button>
              </Col>
            </Row>
          )}
          <Row>
            <h3>
              Status: <em>{card.mastery}</em>
            </h3>
          </Row>
        </Container>
      )}
    </>
  );
}

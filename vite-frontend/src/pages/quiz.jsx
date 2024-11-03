import QuizFlashcard from "../components/quizComponents/quizFlashcard";
import QuizMCQCard from "../components/quizComponents/quizMCQCard";
import Icon from "@mdi/react";
import { mdiAccount } from "@mdi/js";
import { mdiArrowRightBoldBoxOutline } from "@mdi/js";
import { mdiArrowLeftBoldBoxOutline } from "@mdi/js";
import "../components/styles/cards.css";
import "../components/styles/quiz.css";
import {
  addIndex,
  filterCards,
  randomizeCards,
} from "../helperFunctions/filterCards";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "./dashboard";

export default function Quiz({ cardsFormik }) {
  const [back, setBack] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [animationClass, setAnimationClass] = useState("slide-reset");  
  const { quizFilters, setDisplayQuiz, filteredCards } =
    useContext(QuizContext);
  const [key, setKey] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(quizFilters.timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

 
  function goBack(e) {
    if (currentCard > 0) {
      setBack(false);
      setCurrentCard(currentCard - 1);
    }
  }
  function goForward(e) {
    if (currentCard < filteredCards.length - 1) {
      setBack(false);
      setAnimationClass("slide-out-left");

      setTimeout(() => {
        setCurrentCard(currentCard + 1);
        setKey(filteredCards[currentCard + 1].id);
        setAnimationClass("slide-in-right");
      }, 500);

      setTimeout(() => {
        
        setAnimationClass("slide-reset");
      }, 1000);
      
    }
  }

  function submitQuiz() {
    console.log(cardsFormik.values.userCards);
    setDisplayQuiz(false);
  }
  if (timeRemaining === 0) {
    alert("Time's up!");
    submitQuiz();
  }

  return (
    <Container className="quizPage">
      <Row>
        <Col>
          <h1>Time Left: {timeRemaining}s</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Quiz Mode Instructions</h2>
          <p>
            Click on the card to flip it and reveal the answer. Click on the
            arrows to navigate through the cards.
          </p>
        </Col>
      </Row>
      <Row className="quizRow">
        <Col className="quizIconCol">
          {currentCard > 0 && <button onClick={goBack}>
            <Icon
              path={mdiArrowLeftBoldBoxOutline}
              size={3}
              className="quizIcon"
            />
          </button>}
        </Col>
        <Col className="quizCardCol" md={6}>
          {filteredCards[currentCard].cardType == "flashcard" ? (
            <QuizFlashcard
              className={animationClass}
              card={filteredCards[currentCard]}
              back={back}
              setBack={setBack}
              cardsFormik={cardsFormik}
              key={key}
            />
          ) : (
            <QuizMCQCard
              className={animationClass}
              card={filteredCards[currentCard]}
              back={back}
              setBack={setBack}
              cardsFormik={cardsFormik}
              key={key}
            />
          )}
        </Col>
        <Col className="quizIconCol">
          {currentCard < filteredCards.length - 1 && <button onClick={goForward}>
            <Icon path={mdiArrowRightBoldBoxOutline} size={3} />
          </button>}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={submitQuiz}>Exit Quiz Mode</Button>
        </Col>
      </Row>
    </Container>
  );
}

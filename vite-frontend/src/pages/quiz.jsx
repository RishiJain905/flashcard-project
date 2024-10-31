import QuizCard from "../components/quizComponents/quizCard";
import {addIndex, filterCards, randomizeCards} from "../helperFunctions/filterCards";
import {Container, Row, Col} from "react-bootstrap";
import { useContext } from "react";
import { QuizContext } from "./dashboard";

export default function Quiz({cardsFormik}) {
    const {quizFilters, setDisplayQuiz} = useContext(QuizContext);
    console.log(quizFilters, cardsFormik.values.userCards);
    const filteredCards = addIndex(cardsFormik.values.userCards);
    randomizeCards(filteredCards);
    filterCards(filteredCards, quizFilters);
    console.log(JSON.stringify(filteredCards));
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Quiz</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Instructions</h2>
                    <p>Click on the card to flip it and reveal the answer. Click on the arrows to navigate through the cards.</p>
                </Col>
            </Row>
            <Row>
                <Col >
                    <QuizCard card={filteredCards[0]}/>
                </Col>
            </Row>
        </Container>
    );
}
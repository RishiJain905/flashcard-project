import { Container, Row, Col, Button } from "react-bootstrap";
import "./content.css";

function Content({}) {
  return (
    <>
      <Row className="blackBackground">
        <Col className="mainContent">
          <h1>The Latest Flashcard App</h1>
          <h2>Designed by CS Students, For CS Students</h2>
          <Button>Get Started</Button>
        </Col>
      </Row>
      <Container>
        <Row className="examples">
          <Row className="example One">
            <Col lg={6} className="exampleUses">
              <h2>Create</h2>
              <ul>
                <li>Flashcards To Practice Memorization</li>
                <li>Multiple Choice Questions</li>
                <li>Quizzes to Get You Ready For That Exam</li>
              </ul>
            </Col>
            <Col lg={6}>
              <div className="imagePlace"></div>
            </Col>
          </Row>
          <Row className="example Two">
            <Col lg={6}>
              <div className="imagePlace"></div>
            </Col>
            <Col lg={6} className="exampleUses">
              <h2>
                ...Or Use Our AI Generation Feature to Generate Cards on the Fly!
              </h2>
              <h3>Coming Soon!</h3>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Content;

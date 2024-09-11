import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useRef } from "react";
import "./content.css";

function Content({}) {
  const fadeInOne = useRef(null);
  const fadeInTwo = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const elementOne = fadeInOne.current;
      const elementTwo = fadeInTwo.current;
      const positionOne = elementOne.getBoundingClientRect();
      const positionTwo = elementTwo.getBoundingClientRect();

      if (positionOne.top < window.innerHeight && positionOne.bottom >= 0) {
        elementOne.classList.add('animate');
      } 
      if (positionTwo.top < window.innerHeight && positionTwo.bottom >= 0) {
        elementTwo.classList.add('animate');
      } 
    }
    window.addEventListener('scroll', handleScroll);
      
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="content">
        <Row className="blackBackground">
          <Col className="mainContent">
            <h1>The Latest Flashcard App</h1>
            <h2>Designed by CS Students, For CS Students</h2>
            <Button>Get Started</Button>
          </Col>
        </Row>
        <Container>
          <Row className="examples">
            <Row className="example One" ref={fadeInOne}>
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
            <Row className="example Two" ref={fadeInTwo}>
              <Col lg={6}>
                <div className="imagePlace"></div>
              </Col>
              <Col lg={6} className="exampleUses">
                <h2>
                  ...Or Use Our AI Generation Feature to Generate Cards on the
                  Fly!
                </h2>
                <h3>Coming Soon!</h3>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Content;

import { Container , Row, Col, Button} from "react-bootstrap";
import "./content.css";

function Content({}) {
    return (
        <Row className="blackBackground">
            <Col className="mainContent">
                <h1>The Latest Flashcard App</h1>
                <h2>Designed by CS Students, For CS Students</h2>
                <Button>Get Started</Button>
            </Col>
        </Row>
    );
}

export default Content
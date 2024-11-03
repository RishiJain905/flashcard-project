import "./footer.css";
import { Container, Row, Col } from "react-bootstrap";
import Github from "/src/assets/github.webp";

export default function Footer({}) {
  return (
    <div className="footer">
      <Row>
        <Col xs={12}>Creators</Col>
        <Col md={4}>
          <p>Asad Mirza</p>
          <a href="http://github.com/asadbmirza">
            <img className="githubLogo" src={Github} alt="githubLogo" />
          </a>
        </Col>
        <Col md={4}>
          <p>Rishi Jain</p>
          <a href="http://github.com/RishiJain905">
            <img className="githubLogo" src={Github} alt="githubLogo" />
          </a>
        </Col>
        <Col md={4}>
          <p>Moiz Mohammad</p>
          <a href="http://github.com/moizm05">
            <img className="githubLogo" src={Github} alt="githubLogo" />
          </a>
        </Col>
      </Row>
    </div>
  );
}

import Sidebar from "./sidebar/sidebar";
import Content from "./content/content";
import { Container, Row, Col } from "react-bootstrap";

export default function Dashboard({}) {
  return (
    <Row>
      <Col md="auto" className="sideBar">
        <Sidebar
          userInfo={{ name: "Asad Mirza", email: "asadbmirza@gmail.com" }}
        />
      </Col>
      <Col>
        <Content />
      </Col>
    </Row>
  );
}

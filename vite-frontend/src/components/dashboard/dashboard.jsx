import Sidebar from "./sidebar/sidebar";
import Content from "./content/content";
import { Container, Row, Col } from "react-bootstrap";

export default function Dashboard({}) {
  return (
    <Row>
      <Col xs={3} className="sideBar">
        <Sidebar className=""
          userInfo={{ name: "Asad Mirza", email: "asadbmirza@gmail.com" }}
        />
      </Col>
      <Col xs={9}>
        <Content />
      </Col>
    </Row>
  );
}

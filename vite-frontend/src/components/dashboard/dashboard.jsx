import Sidebar from "./sidebar/sidebar";
import Cards from "./content/cards";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function Dashboard({userInfo}) {
  const [groupDisplayed, setGroupDisplayed] = useState(0);
  const [groups, setGroups] = useState(false);

  return (
    <Row>
      <Col xs="auto" className="sideBar">
        <Sidebar
          userInfo={userInfo} setGroupDisplayed={setGroupDisplayed}
        />
      </Col>
      <Col>
        {<Cards 
        userCards={userInfo.groups[groupDisplayed].cards}/>
        }
      </Col>
    </Row>
  );
}

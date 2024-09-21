import Sidebar from "./sidebar/sidebar";
import Cards from "./content/cards";
import Sets from "./content/sets";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function Dashboard({ userInfo }) {
  const [groupDisplayed, setGroupDisplayed] = useState(0);
  const [group, setGroup] = useState(false);

  return (
    <Row>
      <Col xs="auto" className="sideBar">
        <Sidebar
          userInfo={userInfo}
          setGroupDisplayed={setGroupDisplayed}
          setGroup={setGroup}
        />
      </Col>
      <Col>
        {group ? (
          <Sets
            userGroups={userInfo.groups}
            setGroup={setGroup}
            setGroupDisplayed={setGroupDisplayed}
          />
        ) : (
          <Cards userCards={userInfo.groups[groupDisplayed].cards} />
        )}
      </Col>
    </Row>
  );
}

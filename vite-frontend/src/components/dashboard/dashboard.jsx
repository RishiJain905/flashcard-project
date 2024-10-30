import Sidebar from "./sidebar/sidebar";
import Cards from "./content/cards";
import Sets from "./content/sets";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useState } from "react";

export default function Dashboard({ userInfo }) {
  const [groupDisplayed, setGroupDisplayed] = useState(0);
  const [group, setGroup] = useState(false);
  const [render, forceRender] = useState(false);

  const groupsFormik = useFormik({
    initialValues: {
      userGroups: userInfo.groups,
    },
  });
  console.log(groupDisplayed);
  return (
    <Row>
      <Col xs="auto" className="sideBar">
        <Sidebar
          userInfo={userInfo}
          setGroupDisplayed={setGroupDisplayed}
          setGroup={setGroup}
          groupsFormik={groupsFormik}
        />
      </Col>
      <Col>
        {group ? (
          <Sets
            userGroups={userInfo.groups}
            setGroup={setGroup}
            setGroupDisplayed={setGroupDisplayed}
            groupsFormik={groupsFormik}
          />
        ) : <Cards userCards={groupsFormik.values.userGroups[groupDisplayed].cards}/>}
      </Col>
    </Row>
  );
}

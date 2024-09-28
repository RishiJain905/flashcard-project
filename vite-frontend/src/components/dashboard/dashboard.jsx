import Sidebar from "./sidebar/sidebar";
import Cards from "./content/cards";
import Sets from "./content/sets";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useState } from "react";

export default function Dashboard({ userInfo }) {
  const [groupDisplayed, setGroupDisplayed] = useState(0);
  const [group, setGroup] = useState(false);
  const [renderEdit, setRenderEdit] = useState(false);

  const cardsFormik = useFormik({
    initialValues : {
      userGroups : userInfo.groups
    }
  });

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
        ) : renderEdit ? (
          <Form>
            <Cards
              cardsFormik={cardsFormik}
              groupDisplayed={groupDisplayed}
              setRenderEdit={setRenderEdit}
              renderEdit={renderEdit}
              userGroups={userInfo.groups}
            />
          </Form>
        ) : (
          <Cards
            cardsFormik={cardsFormik}
            groupDisplayed={groupDisplayed}
            setRenderEdit={setRenderEdit}
            renderEdit={renderEdit}
            userGroups={userInfo.groups}
          />
        )}
      </Col>
    </Row>
  );
}

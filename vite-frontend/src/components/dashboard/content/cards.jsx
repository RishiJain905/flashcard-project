import { Container, Row, Col, Form } from "react-bootstrap";
import "./cards.css";
import boxPlus from "/src/assets/boxPlus.svg";
import { useState, useEffect } from "react";
import { useFormik } from "formik";

// Flashcard Component
function Flashcard({ card, index, cardsFormik, handleChange }) {
  return (
    <div>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name={`userCards.${index}.description`}
          value={cardsFormik.values?.userCards[index]?.description || ""}
          onChange={(e) => handleChange(e, index)}
        />
      </Form.Group>
    </div>
  );
}

// MCQ Component
function MCQ({ card, index, cardsFormik, handleChange }) {
  return (
    <Form.Group>
      <Form.Label>Options</Form.Label>
      {card.options.map((option, optionIndex) => (
        <Row className="options" key={optionIndex}>
          <Col>
            <Form.Control
              type="input"
              name={`userCards.${index}.options.${optionIndex}`}
              value={
                cardsFormik.values?.userCards[index]?.options[optionIndex] || ""
              }
              onChange={(e) => handleChange(e, index)}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              name={`userCards.${index}.answer`}
              value={optionIndex}
              onChange={() => {
                cardsFormik.setFieldValue(
                  `userCards.${index}.answer`,
                  optionIndex
                );
                cardsFormik.setFieldValue(
                  `userCards.${index}.status`,
                  "updated"
                );
              }}
              checked={
                optionIndex === cardsFormik.values?.userCards[index]?.answer
              }
            />
          </Col>
        </Row>
      ))}
    </Form.Group>
  );
}

function CardsFormat({
  cardsFormik,
  userCards,
  renderEdit,
  setRenderEdit,
  handleCreate,
  handleDelete,
  handleChange,
}) {
  function handleChange(e, index) {
    const { name, value } = e.target;
    // update the form field value
    cardsFormik.setFieldValue(name, value).then(() => {
      cardsFormik.setFieldValue(`userCards.${index}.status`, "updated");
    });
  }

  // Rendering Cards
  function renderCard(card, index) {
    let classes = "card";
    if (renderEdit) classes += " editMode";
    if (!renderEdit) {
      return (
        <div className={classes} key={card.id}>
          <h3>{card.title}</h3>
          <h4>{card.cardType}</h4>
          {card.cardType === "flashcard" && (
            <h4 className="cardDescription">{card.description}</h4>
          )}
        </div>
      );
    }
    return (
      <div className={classes} key={card.id}>
        <div className="typeTitle">
          <Form.Group>
            <Form.Label>Card Title:</Form.Label>
            <Form.Control
              type="text"
              name={`userCards.${index}.title`}
              onChange={(e) => handleChange(e, index)}
              value={cardsFormik.values?.userCards[index]?.title || ""}
            ></Form.Control>
          </Form.Group>
          <h4>{card.cardType}</h4>
          <button className="deleteButton smallButton" type="button" onClick={handleDelete}>
            Delete Card
          </button>
          
        </div>
        {card.cardType === "flashcard" ? (
          <Flashcard
            card={card}
            index={index}
            cardsFormik={cardsFormik}
            handleChange={handleChange}
          />
        ) : (
          <MCQ
            card={card}
            index={index}
            cardsFormik={cardsFormik}
            handleChange={handleChange}
          />
        )}
      </div>
    );
  }

  let classname = "cards";
  if (renderEdit) classname += " edit";

  return (
    <div className="dashboardCards">
      <div className={classname}>
        {userCards.map(renderCard)}
      </div>

      <div className="cardHandlers">
        {renderEdit ? (
          <div className="editButtons">
            <button
              className="editButton"
              type="submit"
              onClick={() => setRenderEdit(false)}
            >
              Finish Editing
            </button>
            <button className="createButton" type="button" onClick={handleCreate}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="boxPlus"
              >
                <title>plus-box</title>
                <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
              </svg>
              Create Flashcard
            </button>
          </div>
        ) : (
          <button className="editButton" onClick={() => setRenderEdit(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="boxPlus"
            >
              <title>plus-box</title>
              <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
            </svg>
            Edit/Create Flashcards
          </button>
        )}
        <button className="quizButton">Quiz Yourself</button>
      </div>
    </div>
  );
}

export default function Cards({ userCards }) {
  const [renderEdit, setRenderEdit] = useState(false);
  function handleCreate(e) {
    return;
  }
  function handleDelete(e) {
    return;
  }

  const cardsFormik = useFormik({
    initialValues: {
      userCards: userCards,
    },
  });
  return renderEdit ? (
    <Form>
      <CardsFormat
        cardsFormik={cardsFormik}
        userCards={userCards}
        setRenderEdit={setRenderEdit}
        renderEdit={renderEdit}
      />
    </Form>
  ) : (
    <CardsFormat
      cardsFormik={cardsFormik}
      userCards={userCards}
      setRenderEdit={setRenderEdit}
      renderEdit={renderEdit}
      handleCreate={handleCreate}
      handleDelete={handleDelete}
    />
  );
}

import { Container, Row, Col, Form } from "react-bootstrap";
import "./cards.css";
import boxPlus from "/src/assets/boxPlus.svg";
import { useState, useEffect } from "react";

export default function Cards({
  cardsFormik,
  groupDisplayed,
  userGroups,
  renderEdit,
  setRenderEdit,
}) {
  const userCards = userGroups[groupDisplayed].cards;

  // Flashcard Component
  function Flashcard({ card, index }) {
    return (
      <div>
        <Form.Group>
          <Form.Label>Card Title:</Form.Label>
          <Form.Control
            type="text"
            name={`userGroups.${groupDisplayed}.cards.${index}.title`}
            onChange={cardsFormik.handleChange}
            value={cardsFormik.values?.userGroups[groupDisplayed]?.cards[index]?.title || ""}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name={`userGroups.${groupDisplayed}.cards.${index}.description`}
            value={cardsFormik.values?.userGroups[groupDisplayed]?.cards[index]?.description || ""}
            onChange={cardsFormik.handleChange}
          />
        </Form.Group>
      </div>
    );
  }

  // MCQ Component
  function MCQ({ card, index }) {
    return (
      <Form.Group>
        <Form.Label>Options</Form.Label>
        {card.options.map((option, optionIndex) => (
          <Row className="options" key={optionIndex}>
            <Col>
              <Form.Control
                type="input"
                name={`userGroups.${groupDisplayed}.cards.${index}.options.${optionIndex}`}
                value={cardsFormik.values?.userGroups[groupDisplayed]?.cards[index]?.options[optionIndex] || ""}
                onChange={cardsFormik.handleChange}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                name={`userGroups.${groupDisplayed}.cards.${index}.answer`}
                value={optionIndex}
                onChange={() => cardsFormik.setFieldValue(`userGroups.${groupDisplayed}.cards.${index}.answer`, optionIndex)}
                checked={optionIndex === cardsFormik.values?.userGroups[groupDisplayed]?.cards[index]?.answer}
              />
            </Col>
          </Row>
        ))}
      </Form.Group>
    );
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
          {card.cardType === "flashcard" && <h4 className="cardDescription">{card.description}</h4>}
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
              name={`userGroups.${groupDisplayed}.cards.${index}.title`}
              onChange={cardsFormik.handleChange}
              value={
                cardsFormik.values?.userGroups[groupDisplayed]?.cards[index]
                  ?.title || ""
              }
            ></Form.Control>
          </Form.Group>
          <h4>{card.cardType}</h4>
        </div>
        {card.cardType === "flashcard" ? (
          <Flashcard card={card} index={index} />
        ) : (
          <MCQ card={card} index={index} />
        )}
      </div>
    );
  }

  let classname = "cards";
  if (renderEdit) classname += " edit";

  return (
    <div className="dashboardCards">
      <div className={classname}>{userCards.map(renderCard)}</div>

      <div className="cardHandlers">
        {renderEdit ? (
          <button
            className="editButton"
            type="submit"
            onClick={() => setRenderEdit(false)}
          >
            Finish Editing
          </button>
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

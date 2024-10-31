import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  ModalHeader,
  Button,
} from "react-bootstrap";
import "./cards.css";
import boxPlus from "/src/assets/boxPlus.svg";
import { useState, useEffect, memo, useCallback } from "react";
import { useFormik } from "formik";
import CardModal from "../modals/newCardModal";
import QuizModal from "../modals/quizModal";

// Flashcard Component
const Flashcard = memo(({ card, index, cardsFormik, handleChange }) => {
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
});

// MCQ Component
const MCQ = memo(({ card, index, cardsFormik, handleChange }) => {
  function addOption() {
    const currentOptions = [...cardsFormik.values.userCards[index].options];
    currentOptions.push("");
    cardsFormik.setFieldValue(`userCards.${index}.options`, currentOptions);
    cardsFormik.setFieldValue(`userCards.${index}.status`, "updated");
  }
  function removeOption() {
    const currentOptions = [...cardsFormik.values.userCards[index].options];
    currentOptions.pop();
    cardsFormik.setFieldValue(`userCards.${index}.options`, currentOptions);
    cardsFormik.setFieldValue(`userCards.${index}.status`, "updated");
    cardsFormik.setFieldValue(`userCards.${index}.answer`, 0);
  }
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
      {card.cardType === "mcq" && card.options.length < 4 && (
        <Button onClick = {addOption}>Add</Button>
      )}
      {card.cardType === "mcq" && card.options.length > 2 && (
        <Button onClick = {removeOption}>Remove</Button>
      )}
    </Form.Group>
  );
});

function CardsFormat({
  cardsFormik,
  userCards,
  renderEdit,
  setRenderEdit,
  handleCreate,
  handleDelete,
}) {
  const [showCardModal, setShowCardModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const handleChange = useCallback(
    (e, index) => {
      const { name, value } = e.target;
      cardsFormik.setFieldValue(name, value);
      cardsFormik.setFieldValue(`userCards.${index}.status`, "updated");
    },
    [cardsFormik]
  );

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
          <button
            className="deleteButton smallButton"
            type="button"
            onClick={(e) => handleDelete(e, index)}
          >
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
    <>
      <div className="dashboardCards">
        <div className={classname}>
          {cardsFormik.values.userCards.map(renderCard)}
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
              <button
                className="createButton"
                type="button"
                onClick={() => setShowCardModal(true)}
              >
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
            <button type="button" className="editButton" onClick={() => setRenderEdit(true)}>
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
          <button type="button" className="quizButton" onClick={() => setShowQuizModal(true)}>Quiz Yourself</button>
        </div>
      </div>
      <CardModal show={showCardModal} setShow={setShowCardModal} handleCreate={handleCreate}/>
      <QuizModal show={showQuizModal} setShow={setShowQuizModal} cardsFormik={cardsFormik} onSubmit={() => console.log("hi")}/>
    </>
  );
}

export default function Cards({ userCards, forceRender }) {
  const [renderEdit, setRenderEdit] = useState(false);
  function handleCreate(e) {
    e.preventDefault();
    const cardType = e.target[0].value;
    const newCard = {
      id: Date.now(),
      title: "",
      cardType: cardType,
      status: "new",
    };
    if (cardType === "flashcard") {
      newCard.description = "";
    } else if (cardType === "mcq") {
      newCard.options = ["", "", ""];
      newCard.answer = 0;
    } else {
      newCard.options = ["True", "False"];
      newCard.answer = 0;
    }

    cardsFormik.setFieldValue("userCards", [
      ...cardsFormik.values.userCards,
      newCard,
    ]);
    return;
  }
  function handleDelete(e, index) {
    const currentCards = [...cardsFormik.values.userCards];
    currentCards[index].status = "deleted";
    //This next line will be replaced with actually sending to the backend
    const newCards = currentCards.filter((card) => card.status !== "deleted");

    cardsFormik.setFieldValue("userCards", newCards);
  }

  const cardsFormik = useFormik({
    initialValues: {
      userCards: userCards,
    },
    enableReinitialize: true,
  });
  console.log(JSON.stringify(cardsFormik.values.userCards));
  return renderEdit ? (
    <Form>
      <CardsFormat
        cardsFormik={cardsFormik}
        userCards={userCards}
        setRenderEdit={setRenderEdit}
        renderEdit={renderEdit}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
    </Form>
  ) : (
    <>
      <CardsFormat
        cardsFormik={cardsFormik}
        userCards={userCards}
        setRenderEdit={setRenderEdit}
        renderEdit={renderEdit}
      />
    </>
  );
}

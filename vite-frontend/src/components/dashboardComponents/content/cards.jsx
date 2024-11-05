import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  ModalHeader,
  Button,
} from "react-bootstrap";
import "../../styles/cards.css";
import { useState, useEffect, memo, useCallback } from "react";
import { useFormik } from "formik";
import CardModal from "../modals/newCardModal";
import QuizModal from "../modals/quizModal";
import {updateCards, postCard, deleteCard} from "../../../helperFunctions/axiosRequests";

// Flashcard Component
const Flashcard = memo(
  ({ card, index, cardsFormik, handleChange, groupsFormik, groupPath }) => {
    return (
      <div>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name={`${groupPath}.${index}.description`}
            value={cardsFormik[index]?.description || ""}
            onChange={(e) => handleChange(e, index)}
          />
        </Form.Group>
      </div>
    );
  }
);

// MCQ Component
const MCQ = memo(
  ({ card, index, cardsFormik, handleChange, groupsFormik, groupPath }) => {
    function addOption() {
      const currentOptions = [...cardsFormik[index].options];
      currentOptions.push("");
      groupsFormik.setFieldValue(
        `${groupPath}.${index}.options`,
        currentOptions
      );
      groupsFormik.setFieldValue(`${groupPath}.${index}.status`, "updated");
    }

    function removeOption() {
      const currentOptions = [...cardsFormik[index].options];
      if (currentOptions.length > 0) {
        currentOptions.pop();
        groupsFormik.setFieldValue(
          `${groupPath}.${index}.options`,
          currentOptions
        );
        groupsFormik.setFieldValue(`${groupPath}.${index}.status`, "updated");
        // Resetting the answer if the last option is removed
        if (currentOptions.length === 0) {
          groupsFormik.setFieldValue(`${groupPath}.${index}.answer`, 0);
        }
      }
    }

    const handleOptionChange = (e, optionIndex) => {
      const { value } = e.target;
      const currentOptions = [...cardsFormik[index].options];
      currentOptions[optionIndex] = value;
      groupsFormik.setFieldValue(
        `${groupPath}.${index}.options`,
        currentOptions
      );
      groupsFormik.setFieldValue(`${groupPath}.${index}.status`, "updated");
    };

    return (
      <Form.Group>
        <Form.Label>Options</Form.Label>
        {card.options.map((option, optionIndex) => (
          <Row className="options" key={optionIndex}>
            <Col>
              <Form.Control
                type="input"
                name={`${groupPath}.${index}.options.${optionIndex}`}
                value={cardsFormik[index]?.options[optionIndex] || ""}
                onChange={(e) => handleOptionChange(e, optionIndex)}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                name={`${groupPath}.${index}.answer`}
                value={optionIndex}
                onChange={() => {
                  groupsFormik.setFieldValue(
                    `${groupPath}.${index}.answer`,
                    optionIndex
                  );
                  groupsFormik.setFieldValue(
                    `${groupPath}.${index}.status`,
                    "updated"
                  );
                }}
                checked={optionIndex === cardsFormik[index]?.answer}
              />
            </Col>
          </Row>
        ))}
        {card.cardType === "mcq" && card.options.length < 4 && (
          <Button onClick={addOption}>Add</Button>
        )}
        {card.cardType === "mcq" && card.options.length > 2 && (
          <Button onClick={removeOption}>Remove</Button>
        )}
      </Form.Group>
    );
  }
);

function CardsFormat({
  cardsFormik,
  renderEdit,
  setRenderEdit,
  handleCreate,
  handleDelete,
  handleChange,
  groupsFormik,
  groupDisplayed,
  groupPath,
}) {
  const [showCardModal, setShowCardModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Rendering Cards
  function renderCard(card, index) {
    let classes = "card " + card.mastery;
    if (renderEdit) classes += " editMode";
    if (!renderEdit) {
      return (
        <div className={classes} key={card.id}>
          <h3>{card.title}</h3>
          <h4>{card.cardType}</h4>
          <h4>{card.mastery}</h4>
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
              name={`${groupPath}.${index}.title`}
              onChange={(e) => handleChange(e, index)}
              value={cardsFormik[index]?.title || ""}
              maxLength="50"
            />
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
            groupsFormik={groupsFormik}
            groupPath={groupPath}
          />
        ) : (
          <MCQ
            card={card}
            index={index}
            cardsFormik={cardsFormik}
            handleChange={handleChange}
            groupsFormik={groupsFormik}
            groupPath={groupPath}
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
        <div className={classname}>{cardsFormik.map(renderCard)}</div>

        <div className="cardHandlers">
          {renderEdit ? (
            <div className="editButtons">
              <button
                className="editButton"
                type="submit"
                onClick={() => {
                  setRenderEdit(false)
                  updateCards(groupsFormik, groupDisplayed)
                }}
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
            <button
              type="button"
              className="editButton"
              onClick={() => setRenderEdit(true)}
            >
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
          <button
            type="button"
            className="quizButton"
            onClick={() => {
              setShowQuizModal(true)
              updateCards(groupsFormik, groupDisplayed)
            }}
          >
            Quiz Yourself
          </button>
        </div>
      </div>
      <CardModal
        show={showCardModal}
        setShow={setShowCardModal}
        handleCreate={handleCreate}
      />
      <QuizModal
        show={showQuizModal}
        setShow={setShowQuizModal}
        cardsFormik={cardsFormik}
      />
    </>
  );
}

export default function Cards({
  cardsFormik,
  groupsFormik,
  groupPath,
  groupDisplayed,
}) {
  const [renderEdit, setRenderEdit] = useState(false);
  console.log(cardsFormik);
  async function handleCreate(e) {
    e.preventDefault();
    const cardType = e.target[0].value;
    const newCard = {
      id: Date.now(),
      title: "",
      cardType: cardType,
      status: "new",
      mastery: "novice",
      group_id: groupsFormik.values.userGroups[groupDisplayed].id,
    };
    console.log(groupsFormik.values.userGroups[groupDisplayed].status);
    groupsFormik.setFieldValue(
      `userGroups.${groupDisplayed}.status`,
      "updated"
    );
    if (cardType === "flashcard") {
      newCard.description = "";
    } else if (cardType === "mcq") {
      newCard.options = ["", "", ""];
      newCard.answer = 0;
    } else {
      newCard.options = ["True", "False"];
      newCard.answer = 0;
    }
    
    const data = await postCard(newCard);
    if (data) {
      newCard.id = data.id;
      newCard.status = "old";
    }

    cardsFormik.push(newCard);
    groupsFormik.setFieldValue(groupPath, cardsFormik);
    
  }

  const handleDelete = async (e, index) => {
    e.preventDefault();
    try {
      await deleteCard(cardsFormik[index]);
    }
    catch (error) {
      console.log(error);
    }
    deleteCard(cardsFormik[index]);
    cardsFormik[index].status = "deleted";
    cardsFormik = cardsFormik.filter((card) => card.status !== "deleted");
    groupsFormik.setFieldValue(groupPath, cardsFormik);
    groupsFormik.setFieldValue(
      `userGroups.${groupDisplayed}.status`,
      "updated"
    );
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    groupsFormik.setFieldValue(name, value);
    groupsFormik.setFieldValue(`${groupPath}.${index}.status`, "updated");
    groupsFormik.setFieldValue(
      `userGroups.${groupDisplayed}.status`,
      "updated"
    );
  };

  return (
    <>
      <CardsFormat
        cardsFormik={cardsFormik}
        renderEdit={renderEdit}
        setRenderEdit={setRenderEdit}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
        handleChange={handleChange}
        groupsFormik={groupsFormik}
        groupDisplayed={groupDisplayed}
        groupPath={groupPath}
      />
    </>
  );
}

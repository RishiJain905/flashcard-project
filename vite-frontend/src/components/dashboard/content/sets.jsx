import { Container, Row, Col } from "react-bootstrap";
import "./sets.css";
import boxPlus from "/src/assets/boxPlus.svg";

function renderSet(card) {
    if (card.type = "desc") {
        return (
            <div className="card" key={card.id}>
                <h3>{card.title}</h3>
                <h4>{card.cardType}</h4>
                {card.cardType == "flashcard" && <h4 className="cardDescription">{card.description}</h4>}
            </div>
        )
    }
}

export default function Sets({userCards}) {
  return (
    <div className="dashboardCards">
      <div className="cards">
        {userCards.map(renderCard)}
      </div>

      <div className="cardHandlers">
        <button className="editButton">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="boxPlus">
            <title>plus-box</title>
            <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
          </svg>
          Edit/Create Flashcards
        </button>
        <button className="quizButton">Quiz Yourself</button>
      </div>
    </div>
  );
}
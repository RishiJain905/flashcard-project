import { Container, Row, Col } from "react-bootstrap";
import "./cards.css";

export default function Cards({}) {
  return (
    <div className="dashboardCards">
      <div className="cards">
        <div className="card">
          <h2>Card Title</h2>
          <h4>Flashcard</h4>
        </div>

        <div className="card">
          <h2>Card Title</h2>
          <h4>Multiple Choice</h4>
        </div>

        <div className="card">
          <h2>Card Title</h2>
          <h4>True/False</h4>
        </div>
        <div className="card">
          <h2>Card Title</h2>
          <h4>True/False</h4>
        </div>
        <div className="card">
          <h2>Card Title</h2>
          <h4>True/False</h4>
        </div>
        <div className="card">
          <h2>Card Title</h2>
          <h4>True/False</h4>
        </div>
        <div className="card">
          <h2>Card Title</h2>
          <h4>True/False</h4>
        </div>
        <div className="card">
          <h2>Card Title</h2>
          <h4>True/False</h4>
        </div>
        <div className="card">
          <h2>Card Title</h2>
          <h4>True/False</h4>
        </div>
      </div>

      <div className="cardHandlers">
        <button className="editButton">Edit/Create Flashcards</button>
        <button className= "quizButton">Quiz Yourself</button>
      </div>
    </div>
  );
}

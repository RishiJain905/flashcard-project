import Sidebar from "../components/dashboardComponents/sidebar/sidebar";
import Cards from "../components/dashboardComponents/content/cards";
import Sets from "../components/dashboardComponents/content/sets";
import Quiz from "./quiz";
import { Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useState, createContext } from "react";
import { addIndex } from "../helperFunctions/filterCards";
const QuizContext = createContext();
export { QuizContext };

export default function Dashboard({ userInfo }) {
  const [groupDisplayed, setGroupDisplayed] = useState(0);
  const [group, setGroup] = useState(false);

  //For the sidebar
  const [isOpen, setIsOpen] = useState(false);

  //For the quiz
  const [displayQuiz, setDisplayQuiz] = useState(false);
  const [quizFilters, setQuizFilters] = useState({});
  const [filteredCards, setFilteredCards] = useState([]);

  const groupsFormik = useFormik({
    initialValues: {
      userGroups: userInfo.groups,
    },
  });
  const cardsFormik = useFormik({
    initialValues: {
      userCards: groupsFormik.values.userGroups[groupDisplayed].cards,
    },
    enableReinitialize: true,
  });
  const toggleSidebar = () => { 
    setIsOpen(!isOpen);
  }
  return (
    <QuizContext.Provider
      value={{
        displayQuiz,
        setDisplayQuiz,
        quizFilters,
        setQuizFilters,
        filteredCards,
        setFilteredCards,
      }}
    >
      <Row>
        {displayQuiz ? (
          <Quiz cardsFormik={cardsFormik} />
        ) : (
          <>
            <Col xs="auto" className={`sideBar ${isOpen ? "open" : ""}`}>
              <Sidebar
                userInfo={userInfo}
                setGroupDisplayed={setGroupDisplayed}
                setGroup={setGroup}
                groupsFormik={groupsFormik}

              />

            </Col>
            <button className="hamburger" onClick={toggleSidebar}>
                ☰
              </button>
            <Col>
              {group ? (
                <Sets
                  userGroups={userInfo.groups}
                  setGroup={setGroup}
                  setGroupDisplayed={setGroupDisplayed}
                  groupsFormik={groupsFormik}
                />
              ) : (
                <Cards cardsFormik={cardsFormik} />
              )}
            </Col>
          </>
        )}
      </Row>
    </QuizContext.Provider>
  );
}

import Sidebar from "../components/dashboardComponents/sidebar/sidebar";
import Cards from "../components/dashboardComponents/content/cards";
import Sets from "../components/dashboardComponents/content/sets";
import Quiz from "./quiz";
import { Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { useState, createContext } from "react";
const QuizContext = createContext();
export { QuizContext };

export default function Dashboard({ userInfo }) {
  const [groupDisplayed, setGroupDisplayed] = useState(0);
  const [group, setGroup] = useState(false);

  //For the quiz
  const [displayQuiz, setDisplayQuiz] = useState(false);
  const [quizFilters, setQuizFilters] = useState({});

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

  console.log(groupDisplayed);
  return (
    <QuizContext.Provider
      value={{
        displayQuiz,
        setDisplayQuiz,
        quizFilters,
        setQuizFilters,
      }}
    >
      <Row>
        {displayQuiz ? (
          <Quiz cardsFormik={cardsFormik}/>
        ) : (
          <>
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

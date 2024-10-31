import { Container, Row, Col, Modal, ModalHeader } from "react-bootstrap";
import { useState } from "react";
import { useFormik } from "formik";
import deleteButton from "/src/assets/delete-circle-outline.svg";
import SetModal from "../modals/setModal";
import WarningModal from "../modals/warningModal";
import "./cards.css";

export default function Sets({
  userGroups,
  setGroup,
  setGroupDisplayed,
  groupsFormik,
}) {
  const [show, setShow] = useState(false);
  const [trash, showTrash] = useState(false);
  const [deleet, setDeleet] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  console.log(trash);
  return (
    <>
      <div className="dashboardSets">
        <div className="sets">
          {groupsFormik.values.userGroups.map((group, index) => {
            return (
              <div
                className="set"
                key={group.id}
                onClick={() => {
                  setGroupDisplayed(index);
                  setGroup(false);
                  setDeleteIndex(index);
                }}
              >
                <h3>{group.title}</h3>
                <h4>{group.subject}</h4>
                <h4>{group.cards.length} Cards</h4>
                {trash && (
                  <img
                    src={deleteButton}
                    className="deleteSet"
                    alt="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteIndex(index);
                      setDeleet(true);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="setHandlers">
          <button className="createButton" onClick={() => setShow(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="boxPlus"
            >
              <title>plus-box</title>
              <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
            </svg>
            Create A New Set
          </button>
          {!trash && (
            <button className="deleteButton" onClick={() => showTrash(true)}>
              Delete A Set
            </button>
          )}
          {trash && (
            <button className="deleteButton" onClick={() => showTrash(false)}>
              Cancel
            </button>
          )}
        </div>
      </div>
      <SetModal show={show} setShow={setShow} groupsFormik={groupsFormik} />
      <WarningModal
        show={deleet}
        setShow={setDeleet}
        groupsFormik={groupsFormik}
        index={deleteIndex}
      />
    </>
  );
}

import { Button } from "react-bootstrap";
import "../../styles/sidebar.css";
import { useState } from "react";
import SetModal from "../modals/setModal";
import {updateCards} from "../../../helperFunctions/axiosRequests";
import { useNavigate } from "react-router";

export default function Sidebar({
  userInfo,
  groupDisplayed,
  setGroupDisplayed,
  setGroup,
  groupsFormik,
}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="userInfo">
          <h3>{userInfo.name}</h3>
          <h4>{userInfo.email}</h4>
        </div>

        <div className="sideBarDashboard">
          <button
            onClick={async () => {
              await updateCards(groupsFormik, groupDisplayed);
              setGroup(true);
            }}
          >
            Dashboard
          </button>
        </div>

        <div className="sideBarSets">
          {groupsFormik.values.userGroups.map((group, index) => {
            return (
              <button
                key={group.id}
                onClick={async () => {
                  console.log(
                    groupsFormik.values.userGroups[groupDisplayed],
                    groupDisplayed
                  );
                  await updateCards(groupsFormik, groupDisplayed);
                  setGroupDisplayed(index);
                  setGroup(false);
                }}
              >
                {group.title}
              </button>
            );
          })}
        </div>

        <div className="sideBarActions">
          <button onClick={() => setShow(true)}>Create Set</button>
        </div>

        <div className="sideBarSettings">
          <button onClick={
            () => {
              localStorage.clear();
              navigate("/");
            }
          }>Log Out</button>
        </div>
      </div>

      <SetModal show={show} setShow={setShow} groupsFormik={groupsFormik} />
    </>
  );
}

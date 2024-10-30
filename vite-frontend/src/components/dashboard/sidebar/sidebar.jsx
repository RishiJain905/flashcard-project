import { Button } from "react-bootstrap";
import "./sidebar.css";
import { useState } from "react";
import SetModal from "../content/setModal";

export default function Sidebar({ userInfo, setGroupDisplayed, setGroup, groupsFormik }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>
        <div className="userInfo">
          <div className="pfp"></div>
          <h3>{userInfo.name}</h3>
          <h4>{userInfo.email}</h4>
        </div>

        <div className="sideBarDashboard">
          <button onClick={() => setGroup(true)}>Dashboard</button>
        </div>

        <div className="sideBarSets">
          {groupsFormik.values.userGroups.map((group, index) => {
            return (
              <button
                key={group.id}
                onClick={() => {
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
          <button>Create Quiz From Set</button>
        </div>

        <div className="sideBarSettings">
          <button>Log Out</button>
        </div>
      </div>

      <SetModal show={show} setShow={setShow} groupsFormik={groupsFormik} />
    </>
  );
}

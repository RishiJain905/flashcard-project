import { Button } from "react-bootstrap";
import "./sidebar.css";

export default function Sidebar({ userInfo, setGroupDisplayed, setGroup }) {
  return (
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
        {userInfo.groups.map((group, index) => {
          return <button key={group.id} onClick={() => {
            setGroupDisplayed(index)
            setGroup(false);
          }}>{group.title}</button>;
        })}
      </div>

      <div className="sideBarActions">
        <button>Create Set</button>
        <button>Create Quiz From Set</button>
      </div>

      <div className="sideBarSettings">
        <button>Settings</button>
        <button>Log Out</button>
      </div>
    </div>
  );
}

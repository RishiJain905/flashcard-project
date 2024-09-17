import { Button } from "react-bootstrap";
import "./sidebar.css";

export default function Sidebar({ userInfo }) {
  return (
    <>
      <div className="userInfo">
        <div className="pfp"></div>
        <h3>{userInfo.name}</h3>
        <h4>{userInfo.email}</h4>
      </div>

      <div className="sideBarSets">
        <button>Dashboard</button>
        <button>Dashboard</button>
        <button>Dashboard</button>
        <button>Dashboard</button>
        
      </div>

      <div className="sideBarActions">
        <button>Create Set</button>
        <button>Create Quiz From Set</button>
      </div>

      <div className="sideBarSettings">
        <button>Settings</button>
        <button>Log Out</button>
      </div>
    </>
  );
}

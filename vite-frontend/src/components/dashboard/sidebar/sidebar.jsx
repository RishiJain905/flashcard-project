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
        <Button>Dashboard</Button>
        <Button>Dashboard</Button>
        <Button>Dashboard</Button>
        <Button>Dashboard</Button>
        
      </div>

      <div className="sideBarActions">
        <Button>Create Set</Button>
        <Button>Create Quiz From Set</Button>
      </div>

      <div className="sideBarSettings">
        <Button>Settings</Button>
        <Button>Log Out</Button>
      </div>
    </>
  );
}

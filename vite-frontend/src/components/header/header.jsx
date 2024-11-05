import "./header.css";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({}) {
  return (
    <div className="projectHeader">
      <Navbar expand="md" variant="light" className="justify-content-between bg-body-tertiary">
        <Navbar.Brand as={Link} to="/">Quiztime</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/login">
              <Button variant="primary">Sign in</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
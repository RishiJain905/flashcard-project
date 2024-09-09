import "./header.css";
import { Button, Nav, Navbar } from "react-bootstrap";

function Header({}) {
  return (
    <Navbar expand="md" variant="light" className="justify-content-between bg-body-tertiary">
      <Navbar.Brand>The Cards</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link>Dashboard</Nav.Link>
          <Nav.Link>
            <Button variant="primary">Sign in</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

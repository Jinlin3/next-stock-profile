import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (  
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav>
            <Nav.Link as={Link} href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 
export default NavBar;
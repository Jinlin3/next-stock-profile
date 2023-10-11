import Link from "next/link";
import { Button, Col, Container, Form, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import styles from "@/styles/Navbar.module.css";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();
    if (searchQuery) {
      router.push(`/quote/${searchQuery}`);
    }
  }
  return (  
    <Navbar variant="dark" sticky="top" expand="md" collapseOnSelect className={`${styles.navbarStyles}`}>
      <Container>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/indices/dowjones">Dow Jones</Nav.Link>
            <Nav.Link as={Link} href="/indices/nasdaq">Nasdaq</Nav.Link>
          </Nav>
          <Form className='d-flex' onSubmit={handleSubmit}>
            <Row className="d-flex align-items-center">
              <Col xs="auto">
                <Form.Control name="searchQuery" type="text" placeholder="e.g. AAPL, GOOG, ..." className={styles.SearchBarStyles} />
              </Col>
              <Col xs="auto">
                <Button type="submit" className="btn-md btn-secondary">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
 
export default NavBar;
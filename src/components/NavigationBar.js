import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { config } from '../../src/components/config/config';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
function NavigationBar() {
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const role = localStorage.getItem("role")

  const handleLogout = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout?"
    );
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      await fetch(config.serverUrl + "logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // ✅ Remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      // Redirect to login
      window.location.href = "/";
    }

  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: 100 }}
            navbarScroll
          >
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            <NavDropdown title="Services" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Charts</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />             
            </NavDropdown>
            <Nav.Link href="/profile">
              Profile
            </Nav.Link>
          </Nav>
          <p style={{ marginRight: 80 }}>Welcome to <span style={{ textTransform: "capitalize", color: "green" }}>{username}</span></p>
        </Navbar.Collapse>
        <div className="d-flex justify-content-end mt-0">
          <Button style={{ width: 150, marginRight: 100 }} variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
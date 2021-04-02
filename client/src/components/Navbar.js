import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";

const CustomNavbar = (props) => {
  return (
    <div>
      {props.history.location.pathname !== "/" && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <LinkContainer to="/dashboard">
            <Navbar.Brand>Invoice Generator</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" activeKey="/">
              <IndexLinkContainer to="/dashboard">
                <Nav.Link active={false}>Dashboard</Nav.Link>
              </IndexLinkContainer>
              <IndexLinkContainer to="/createinvoice">
                <Nav.Link active={false}>Create Invoice</Nav.Link>
              </IndexLinkContainer>
            </Nav>
            <Nav>
              <button
                onClick={() => props.onSignOutClick(props.history)}
                className="btn btn-dark"
              >
                <i className="fab fa-google mr-1"></i>
                Sign Out
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
};

export default CustomNavbar;
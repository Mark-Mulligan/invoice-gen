import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import Confirm from "../modals/Confirm";

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
              {props.history.location.pathname === "/dashboard" && (
                <Nav.Link active={false} onClick={props.showModal}>
                  Add Student
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <Confirm 
                onConfirm={() => props.onSignOutClick(props.history)}
                buttonVariant="dark"
                buttonText="Sign Out"
                message="Sign Out?"
                googleButton
              />
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
};

export default CustomNavbar;

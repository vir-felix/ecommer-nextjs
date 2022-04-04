import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faChevronRight,
  faListCheck,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

const CustomHeader = ({ currentUser }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [numItems, setNumItems] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [onMobile, setOnMobile] = useState(true);

  useEffect(() => {
    // Update window innerWidth every 0.1 second
    const interval = setInterval(() => {
      // Initial retrieve data from localStorage
      const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

      if (cartItems.length !== 0) {
        setShowNotification(true);
        setNumItems(cartItems.length);
      } else if (cartItems.length === 0 || !cartItems) {
        setShowNotification(false);
        setNumItems(0);
      }

      if (window.innerWidth <= 992) {
        setOnMobile(true);
      } else {
        setOnMobile(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentUser, onMobile]);

  return onMobile ? (
    <header>
      <Navbar
        variant="light"
        expand="lg"
        fixed="top"
        collapseOnSelect="true"
        className="menu"
      >
        <Container>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <Link href="/" passHref>
                  <Navbar.Brand className="header-logo text-uppercase">
                    Aurapan
                  </Navbar.Brand>
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="d-flex flex-column justify-content-between ">
              <Nav className="offcanvas-body-upper d-flex flex-column justify-content-start">
                <Link href="/products/bestseller" passHref>
                  <Nav.Link className="offcanvas-link">
                    Bestseller <FontAwesomeIcon icon={faChevronRight} />
                  </Nav.Link>
                </Link>

                <Link href="/products/tops" passHref>
                  <Nav.Link className="offcanvas-link">
                    Top <FontAwesomeIcon icon={faChevronRight} />
                  </Nav.Link>
                </Link>

                <Link href="/products/bottoms" passHref>
                  <Nav.Link className="offcanvas-link">
                    Bottom <FontAwesomeIcon icon={faChevronRight} />
                  </Nav.Link>
                </Link>

                <Link href="/products/dresses" passHref>
                  <Nav.Link className="offcanvas-link">
                    Dress <FontAwesomeIcon icon={faChevronRight} />
                  </Nav.Link>
                </Link>

                <Link href="/products/sets" passHref>
                  <Nav.Link className="offcanvas-link">
                    Set <FontAwesomeIcon icon={faChevronRight} />
                  </Nav.Link>
                </Link>

                <Link href="/products/coats" passHref>
                  <Nav.Link className="offcanvas-link">
                    Coat <FontAwesomeIcon icon={faChevronRight} />
                  </Nav.Link>
                </Link>
              </Nav>

              {currentUser ? (
                <Nav className="offcanvas-body-lower mb-2 d-flex flex-row justify-content-around">
                  <Link href="/dashboard" passHref>
                    <Nav.Link>
                      <FontAwesomeIcon icon={faUser} /> Account
                    </Nav.Link>
                  </Link>
                  {currentUser?.isAdmin && (
                    <Link href="/admin" passHref>
                      <Nav.Link>
                        <FontAwesomeIcon icon={faListCheck} /> Management
                      </Nav.Link>
                    </Link>
                  )}
                  <Link href="/signout" passHref>
                    <Nav.Link>
                      <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
                    </Nav.Link>
                  </Link>
                </Nav>
              ) : (
                <Nav className="mx-3 d-flex flex-row justify-content-end ">
                  <Link href="/signin" passHref>
                    <Nav.Link>
                      <FontAwesomeIcon icon={faRightToBracket} /> Sign In
                    </Nav.Link>
                  </Link>
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <Link href="/" passHref>
            <Navbar.Brand className="header-logo text-uppercase">
              Aurapan
            </Navbar.Brand>
          </Link>

          <Nav className="icon-menu d-flex flex-row">
            <Link href="/cart" passHref>
              <Nav.Link className="position-relative cart-icon">
                <FontAwesomeIcon icon={faBasketShopping} /> Cart
                <span
                  id="notification"
                  className="position-absolute  badge border border-light rounded-circle bg-danger"
                  style={{ display: showNotification ? "block" : "none" }}
                >
                  <span className="visually-hidden">unread messages</span>
                  {numItems}
                </span>
              </Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  ) : (
    <header>
      <Navbar
        variant="light"
        expand="lg"
        fixed="top"
        collapseOnSelect="true"
        className="menu"
      >
        <Container
          className="menu-container d-flex flex-row"
          onMouseLeave={() => setShowDropDown(false)}
        >
          <Link href="/" passHref>
            <Navbar.Brand className="header-logo text-uppercase">
              Aurapan
            </Navbar.Brand>
          </Link>

          <Nav className="sub-menu">
            <Link href="/products/bestseller" passHref>
              <Nav.Link>Bestseller</Nav.Link>
            </Link>

            <Link href="/products/tops" passHref>
              <Nav.Link>Top</Nav.Link>
            </Link>

            <Link href="/products/bottoms" passHref>
              <Nav.Link>Bottom</Nav.Link>
            </Link>

            <Link href="/products/dresses" passHref>
              <Nav.Link>Dress</Nav.Link>
            </Link>

            <Link href="/products/sets" passHref>
              <Nav.Link>Set</Nav.Link>
            </Link>

            <Link href="/products/coats" passHref>
              <Nav.Link>Coat</Nav.Link>
            </Link>
          </Nav>

          <Nav className="icon-menu d-flex flex-row position-relative">
            <Link href="/cart" passHref>
              <Nav.Link className="position-relative cart-icon">
                <FontAwesomeIcon icon={faBasketShopping} /> Cart
                <span
                  id="notification"
                  className="position-absolute  badge border border-light rounded-circle bg-danger"
                  style={{ display: showNotification ? "block" : "none" }}
                >
                  <span className="visually-hidden">unread messages</span>
                  {numItems}
                </span>
              </Nav.Link>
            </Link>

            <Link href={currentUser ? "/dashboard" : "/signin"} passHref>
              <Nav.Link
                className="account-icon"
                onMouseEnter={() =>
                  currentUser ? setShowDropDown(true) : setShowDropDown(false)
                }
              >
                <FontAwesomeIcon icon={faCircleUser} /> Account
              </Nav.Link>
            </Link>

            <div
              className="account-dropdown-menu"
              style={{ display: showDropDown ? "block" : "none" }}
              onMouseLeave={() => setShowDropDown(false)}
            >
              <div className="account-dropdown-item account-dropdown-title d-flex justify-content-center">
                {currentUser?.name}
              </div>

              <Link href="/dashboard" passHref>
                <a className="account-dropdown-item">
                  <FontAwesomeIcon icon={faUser} /> Account
                </a>
              </Link>

              {currentUser?.isAdmin && (
                <Link href="/admin" passHref>
                  <a className="account-dropdown-item">
                    <FontAwesomeIcon icon={faListCheck} /> Management
                  </a>
                </Link>
              )}

              <Link href="/signout" passHref>
                <a className="account-dropdown-item">
                  <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
                </a>
              </Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default CustomHeader;

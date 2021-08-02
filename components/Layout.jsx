import React from "react";
import { Link } from "@material-ui/core";
import withAuth from "../pages/HOC/withAuth";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function Layout(props) {
  const Router = useRouter();
  const logout = () => {
    Cookies.remove("token");
    Router.replace("/login");
  };
  return (
    <div>
      <div id="app" className="nav-drawer-is-open">
        <div className="sidenav">
          <div className="sidenav-col sidenav-col-primary">
            <ol className="nav-list">
              <li className="nav-list-item nav-list-item-header"></li>
              <li className="nav-list-item">
                <Link
                  href="/dashboard"
                  className="nav-list-item-link is-selected"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-list-item">
                <Link
                  href="/place"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Place
                </Link>
              </li>
              <li className="nav-list-item">
                <Link
                  href="/pt"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  PT
                </Link>
              </li>
              <li className="nav-list-item">
                <Link
                  href="/course"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Course
                </Link>
              </li>
              <li className="nav-list-item">
                <Link
                  href="/schedule"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Schedule
                </Link>
              </li>
              <li className="nav-list-item">
                <Link
                  href="/checkin"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Check In
                </Link>
              </li>
            </ol>
          </div>
        </div>

        <div className="header-row">
          <header className="layout-header">
            <div className="layout-header-right">
              <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                // menuVariant="dark"
                title="Admin"
                className="mt-2"
              >
                <Dropdown.Item href="/profiles" className="admin-header-menu">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logout} className="admin-header-menu">
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </header>
        </div>

        <main id="content" role="main">
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

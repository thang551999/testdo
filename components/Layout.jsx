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
                <Link href="/userandcoin" className="nav-list-item-link">
                  Quản lý user và coin
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
              {/* <li className="nav-list-item" style={{ marginLeft: "10%" }}>
                <Link
                  href="/pt"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  PT
                </Link>
              </li> */}
              <li className="nav-list-item" style={{ marginLeft: "10%" }}>
                <Link
                  href="/course"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Course
                </Link>
              </li>
              {/* <li className="nav-list-item" style={{ marginLeft: "10%" }}>
                <Link
                  href="/courseOnline"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Course Online
                </Link>
              </li> */}
              <li className="nav-list-item" style={{ marginLeft: "10%" }}>
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
                  href="/online"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Khóa học online
                </Link>
              </li>
              <li className="nav-list-item">
                <Link
                  href="/spa"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Chăm sóc sức khỏe
                </Link>
              </li>
              <li className="nav-list-item" style={{ marginLeft: "10%" }}>
                <Link
                  href="/serviceSpa"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Dịch vụ
                </Link>
              </li>
              <li className="nav-list-item">
                <Link
                  href="/sport"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Thể thao giải trí
                </Link>
              </li>
              <li className="nav-list-item" style={{ marginLeft: "10%" }}>
                <Link
                  href="/serviceSport"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Dịch vụ giải trí
                </Link>
              </li>
              {/* <li className="nav-list-item">
                <Link
                  href="/checkin"
                  className="nav-list-item-link"
                  id="nav-item-orders"
                >
                  Check In
                </Link>
              </li> */}
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

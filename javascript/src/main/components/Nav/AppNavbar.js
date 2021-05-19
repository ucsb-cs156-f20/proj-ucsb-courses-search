import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import AuthNav from "main/components/Nav/AuthNav";
import ScheduleNav from "main/components/Nav/ScheduleNav";
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWithToken } from "main/utils/fetch";


function AppNavbar() {
  const { getAccessTokenSilently: getToken } = useAuth0();
  const { data: roleInfo } = useSWR(
    ["/api/myRole", getToken],
    fetchWithToken
  );
  const isAdmin = roleInfo && roleInfo.role.toLowerCase() === "admin";
  const isMember = roleInfo && roleInfo.role.toLowerCase() === "member";

  return (
    <Navbar className="navbar-custom" expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle />
      <Navbar.Collapse>
      <LinkContainer to={""}>
        <Navbar.Brand data-testid="brand">
          <p className="brand"><img className="brand" src={'/proj-ucsb-courses-search-240x240.png'}  alt="UCSB Courses Search icon"  /></p>
          <p className="brand">UCSB <br />Courses Search</p>
          </Navbar.Brand>
      </LinkContainer>
      <Nav>
        <LinkContainer to={"/about"}>
            <Nav.Link>About</Nav.Link>
        </LinkContainer>
        
        <NavDropdown title="Search">
            <NavDropdown.Item href="/history/basic">Basic Search</NavDropdown.Item>
            <NavDropdown.Item href="/history/courseNumber">Search By Course Number</NavDropdown.Item>
            <NavDropdown.Item href="/history/ge">GE Search</NavDropdown.Item>
            <NavDropdown.Item href="/history/instructor">Search By Instructor</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Statistics">
          <NavDropdown.Item as={Link} to="/statistics/numFullCoursesByDept">
            Full Classes by Department
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/courseOccupancy">
            Course Occupancy by Department
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/courseOccupancyByDivision">
            Course Occupancy by Class Division
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/classSize">
            Average Class Size by Department
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/totalCourses">
            Total Courses by Department
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/numOpenCoursesByDept">
            Open Courses by Department
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/statistics/aggregateStatistics">
            Aggregate Statistics
          </NavDropdown.Item>
        </NavDropdown>

        { (isAdmin || isMember) &&
            (<ScheduleNav/>)
        }
          {isAdmin && (
              <NavDropdown title="Admin">
                  <NavDropdown.Item as={Link} to={"/admin/panel"}>
                      Admin Panel
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/admin/settings"}>
                      Admin Settings
                  </NavDropdown.Item>
              </NavDropdown>
          )}
          

        
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <AuthNav />
      </Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
    
  );
}

export default AppNavbar;
import React from "react";
import { render } from "@testing-library/react";
import AppNavbar from "main/components/Nav/AppNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
jest.mock("@auth0/auth0-react");

describe("AppNavbar tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });
  test("should render the correct brand text", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <AppNavbar />
      </Router>
    );
    const brandElement = getByText(/UCSB Courses Search/);
    expect(brandElement).toBeInTheDocument();
  });
  
});

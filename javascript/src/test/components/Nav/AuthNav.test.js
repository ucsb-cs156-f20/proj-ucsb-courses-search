import React from "react";
import { render } from "@testing-library/react";
import AuthNav from "main/components/Nav/AuthNav";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";	
import { useAuth0 } from "@auth0/auth0-react";
jest.mock("@auth0/auth0-react");
describe("AuthNav tests", () => {
  const user = {
    name: "Test",
    picture: "http://placekitten.com/200/300"
  }

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
    });
  });
  test("it renders without crashing", () => {
    render(<AuthNav />);
  });

  test("it renders a login button when logged out", () => {
    useAuth0.mockReturnValueOnce({
      isAuthenticated: false,
    });
    const { getByText } = render(<AuthNav />);
    const loginButton = getByText(/Log In/);
    expect(loginButton).toBeInTheDocument();
  });

  test("it renders a logout button when logged out", () => {
    useAuth0.mockReturnValueOnce({
      user
    });

    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <AuthNav />
      </Router> 
    );
    const loginButton = getByText(/Log Out/);
    expect(loginButton).toBeInTheDocument();
  });

  test("it renders a welcome message and profile picture when logged in", () => {

    useAuth0.mockReturnValueOnce({
      user
    });

    const history = createMemoryHistory();

    const { getByText, getByAltText } = render(
      <Router history={history}>
        <AuthNav />
      </Router>
    );
    const welcomeText = getByText("Hello, " + user.name);
<<<<<<< HEAD
=======

>>>>>>> aa4aa47db766ee76417ba4bb01a63ff54c70752c
    expect(welcomeText.closest('a')).toHaveAttribute('href', '/profile');
    expect(welcomeText).toBeInTheDocument();
    const profileImage = getByAltText("Profile");
    expect(profileImage).toBeInTheDocument();
  });
});

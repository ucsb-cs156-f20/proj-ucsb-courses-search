import React from "react";
import { render,fireEvent } from "@testing-library/react";
import Ge from "main/pages/History/Ge";
import { useToasts } from 'react-toast-notifications'

jest.mock("react-toast-notifications", () => ({
  useToasts: jest.fn()
}));

describe("History Ge Course Search page tests", () => {

  const addToast = jest.fn();
  beforeEach(() => {
      useToasts.mockReturnValue({
          addToast: addToast
        })
  });
  
  test("renders without crashing", () => {
    render(<Ge/>);
  });

  test("Test for checkbox Cancelled,Closed,Full", () => {
    const { getByTestId } =  render(<Ge/>);

    const checkboxCancelled = getByTestId("inline-checkbox-cancelled");
    expect(checkboxCancelled.checked).toEqual(false);
    fireEvent.click(checkboxCancelled);
    expect(checkboxCancelled.checked).toEqual(true);

    const checkboxClosed = getByTestId("inline-checkbox-closed");
    expect(checkboxClosed.checked).toEqual(false);
    fireEvent.click(checkboxClosed);
    expect(checkboxClosed.checked).toEqual(true);

    const checkboxFull = getByTestId("inline-checkbox-full");
    expect(checkboxFull.checked).toEqual(false);
    fireEvent.click(checkboxFull);
    expect(checkboxFull.checked).toEqual(true);
  });
  
});

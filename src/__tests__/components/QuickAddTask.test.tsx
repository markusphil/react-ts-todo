import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuickAddTask from "../../components/QuickAddTask";


const onAdd = jest.fn();

test("not Done", () => {
  const { getByLabelText, getByRole } = render(
    <QuickAddTask addTaskHandler={onAdd} />
  );
  const input = getByLabelText("Add new task");
  const btn = getByRole("button");
  expect(input).toBeInTheDocument();
  userEvent.type(input,"Test")
  userEvent.click(btn);
  expect(onAdd).toHaveBeenCalledWith("Test");
});


import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {} from "jest";

import TaskEntry from "../components/TaskEntry";
import { Task } from "../types";

const undoneTask: Task = {
  id: 1,
  name: "First Test",
  createdAt: new Date(),
  done: false,
};

const doneTask: Task = {
  id: 2,
  name: "Second Test",
  createdAt: new Date(),
  done: true,
};

const onChange = jest.fn();

test("not Done", () => {
  const { getByLabelText } = render(
    <TaskEntry {...undoneTask} changeHandler={onChange} />
  );
  const input = getByLabelText(undoneTask.name);
  expect(input).toBeInTheDocument();
  expect(input).not.toBeChecked();
  userEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(1, true);
});

test("allready Done", () => {
  const { getByLabelText } = render(
    <TaskEntry {...doneTask} changeHandler={onChange} />
  );
  const input = getByLabelText(doneTask.name);
  expect(input).toBeInTheDocument();
  expect(input).toBeChecked();
  userEvent.click(input);
  expect(onChange).toHaveBeenCalledWith(2, false);
});

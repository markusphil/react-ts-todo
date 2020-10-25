import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// fixtures
import { doneTask, undoneTask } from "../../fixtures/taskFixtures";
// component
import TaskEntry from "../../components/TaskEntry";

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

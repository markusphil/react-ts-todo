import React from "react";
import { render } from "@testing-library/react";
import { doneTask, undoneTask } from "../taskFixtures";
import TaskList from "../components/TaskList";

const fixtureList = [doneTask, undoneTask];

const onChange = jest.fn();

test("empty list", () => {
  const { queryByRole } = render(
    <TaskList tasks={[]} updateTaskHandler={onChange} />
  );
  expect(queryByRole("list")).toBeNull();
});

test("empty list", () => {
  const { getByRole, getByLabelText } = render(
    <TaskList tasks={fixtureList} updateTaskHandler={onChange} />
  );
  getByRole("list");
  getByLabelText("First Test");
  getByLabelText("Second Test");
});

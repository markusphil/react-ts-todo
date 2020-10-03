import { Task } from "./types";

export const undoneTask: Task = {
  id: 1,
  name: "First Test",
  createdAt: new Date(),
  done: false,
};

export const doneTask: Task = {
  id: 2,
  name: "Second Test",
  createdAt: new Date(),
  done: true,
};

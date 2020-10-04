import { Task } from "./types";

export const undoneTask: Task = {
  id: 1,
  name: "First Test",
  createdAt: new Date(),
  done: false,
  category: {
    id: 2,
    color: "orange",
    name: "wuhoo",
  },
};

export const doneTask: Task = {
  id: 2,
  name: "Second Test",
  createdAt: new Date(),
  done: true,
  category: {
    id: 3,
    color: "green",
    name: "YOLO",
  },
};

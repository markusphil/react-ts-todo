import { Task } from "../types/types";
import { testCat } from "./categoryFixtures";

export const undoneTask: Task = {
  id: 1,
  name: "First Test",
  createdAt: new Date(),
  done: false,
  category: testCat
};

export const doneTask: Task = {
  id: 2,
  name: "Second Test",
  createdAt: new Date(),
  done: true,
  category: testCat
};

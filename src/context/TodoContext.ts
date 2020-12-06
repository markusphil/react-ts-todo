import { createContext } from "react";
import { Category, Task } from "../types/types";

interface Filter {
    categoryIds: number[]
}

interface ITodoContext {
    taskList: Task[];
    categoryList: Category[];
    filter: Filter,
    setFilter?: (payload: Filter) => void
}

export const todoDefaultContext: ITodoContext = {
    taskList: [],
    categoryList: [],
    filter: {
        categoryIds: []
    },
}

export const TodoContext = createContext<ITodoContext>(todoDefaultContext);

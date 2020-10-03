export interface Task {
  id: number;
  name: string;
  done: boolean;
  descripton?: string;
  dueTo?: Date;
  createdAt: Date;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface EventHandlerWithId {
  (id: number, value: string): void;
}

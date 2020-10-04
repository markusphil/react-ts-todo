export interface Task {
  id: number;
  name: string;
  done: boolean;
  description?: string;
  dueTo?: Date;
  createdAt: Date;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

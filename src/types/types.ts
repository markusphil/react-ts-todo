export interface TaskPrototype {
  name: string;
  done: boolean;
  description?: string;
  dueTo?: Date;
  createdAt: Date;
  category?: Category;
}

export interface Task extends TaskPrototype {
  id: number;
  
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

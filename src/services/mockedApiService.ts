import { defaultCat, testCat } from './../fixtures/categoryFixtures';
import { doneTask, undoneTask } from '../fixtures/taskFixtures';
import { Task, TaskPrototype, Category, CategoryPrototype } from './../types/types';

type Route = "task" | "category"

type GetReturnTypes = {
    task: Task[],
    category: Category[]
}

type PostPayloadTypes = {
    task: TaskPrototype,
    category: CategoryPrototype
}

type PostReturnTypes = {
    task: Task,
    category: Category
}

type ApiServiceType = {
    get<P extends Route>(route: P , id?:number):Promise<GetReturnTypes[P]>
    post<P extends Route>(route: P, params: PostPayloadTypes[P]):Promise<PostReturnTypes[P]>
}

interface Repo<T> {
    list: T[];
    get: (id?:number)=>Promise<T[]>;
    post: (params:any)=>Promise<T>;
}

class TaskRepo implements Repo<Task> {
    list = [doneTask, undoneTask];
    get (id?:number){
        let res:Task[];
        if(id) res = this.list.filter(t => t.id ===id);
        res = [...this.list];
        return new Promise<Task[]>(resolve => setTimeout(resolve.bind(null, res),5000))
    }

    post(task: TaskPrototype){
        const res = {...task, id: Math.round(Math.random()*3000) }
        this.list.push(res);
        return new Promise<Task>(resolve => setTimeout(resolve.bind(null, res),3000))
    }
}

class CategoryRepo implements Repo<Category> {
    list = [defaultCat, testCat];
    get (id?:number){
        let res:Category[];
        if(id) res = this.list.filter(t => t.id ===id);
        res = [...this.list];
        return new Promise<Category[]>(resolve => setTimeout(resolve.bind(null, res),5000))
    }

    post(task: CategoryPrototype){
        const res = {...task, id: Math.round(Math.random()*300) }
        this.list.push(res);
        return new Promise<Category>(resolve => setTimeout(resolve.bind(null, res),3000))
    }
}

const mockedTaskRepo = new TaskRepo();
const mockedCatRepo = new CategoryRepo();

// TODO: get rid of ungly type assertions

export const apiService:ApiServiceType = {
    get: (route, id) => {
        switch (route){
            case "task":
                return mockedTaskRepo.get(id) as Promise<any>;
            case "category":
                return mockedCatRepo.get(id) as Promise<any>;
            default :
                throw new Error("invalid Route!")
        };
    },

    post: (route, params) => {
        switch (route){
            case "task":
                return mockedTaskRepo.post(params as TaskPrototype) as Promise<any>;
            case "category":
                return mockedCatRepo.post(params as CategoryPrototype) as Promise<any>;
            default :
                throw new Error("invalid Route!")
        }
    }
}
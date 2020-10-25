import { doneTask, undoneTask } from '../fixtures/taskFixtures';
import { RouteUnion } from '../types/helpers';
import { Task, TaskPrototype } from './../types/types';
type Route = "task" | "category"

type GetReturnTypes = {
    ["task"]: Task[],
    //["category"]: Category[]
}

type PostPayloadTypes = {
    ["task"]: TaskPrototype
}

type PostReturnTypes = {
    ["task"]: Task
}

type ApiServiceType = {
    get(route: Route , id?:number):Promise<RouteUnion<GetReturnTypes>>
    post(route: Route, params: RouteUnion<PostPayloadTypes>):Promise<RouteUnion<PostReturnTypes>>

}

interface Repo<T> {
    list: T[];
    get: (id?:number)=>Promise<T[]>;
    post: (params:T)=>Promise<T>;
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

const mockedTaskRepo = new TaskRepo()

export const apiService:ApiServiceType = {
    get: (route, id) => {
        switch (route){
            case "task":
                return mockedTaskRepo.get(id);
            default :
                throw new Error("invalid Route!")
        };
    },

    post: (route, params) => {
        switch (route){
            case "task":
                return mockedTaskRepo.post(params);
            default :
                throw new Error("invalid Route!")
        }
    }

}
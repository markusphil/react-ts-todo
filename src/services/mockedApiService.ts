import { doneTask, undoneTask } from './../taskFixtures';
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
    get: (id?:number)=>T[];
    post: (params:T)=>T;
}

class TaskRepo implements Repo<Task> {
    list = [doneTask, undoneTask];
    get (id?:number){
        if(id) return this.list;
        return [...this.list];
    }

    post(task: TaskPrototype){
        const res = {...task, id: Math.round(Math.random()*3000) }
        this.list.push(res);
        return res;
    }
}

const mockedTaskRepo = new TaskRepo()

export const apiService:ApiServiceType = {
    get: (route, id) => {
        switch (route){
            case "task":
                return Promise.resolve(mockedTaskRepo.get(id));
            default :
                throw new Error("invalid Route!")
        };
    },

    post: (route, params) => {
        switch (route){
            case "task":
                return Promise.resolve(mockedTaskRepo.post(params));
            default :
                throw new Error("invalid Route!")
        }
    }

}
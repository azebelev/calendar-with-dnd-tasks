import { Task } from '../types/todoTypes';

export const localStorageSync = {
    sync(data:Record<string, Task[]>) {
        localStorage.setItem('tasksData',JSON.stringify(data))
    },
    getData() {
        return JSON.parse(localStorage.getItem('tasksData')??'{}') as Record<string, Task[]>;
    }
}
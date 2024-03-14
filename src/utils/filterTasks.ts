import { Task } from '../types/todoTypes';

export function filterTasks(filter: string, tasksByDateString: Record<string, Task[]>): Record<string, Task[]> {
    const filteredTasks: Record<string, Task[]> = {};
    for (const dateString in tasksByDateString) {
        const filteredTasksForDate = tasksByDateString[dateString].filter(task =>
            task.text.toLowerCase().includes(filter.toLowerCase())
        );
        if (filteredTasksForDate.length > 0) {
            filteredTasks[dateString] = filteredTasksForDate;
        }
    }
    return filteredTasks;
}
import { UniqueIdentifier } from '@dnd-kit/core';
import { Task } from '../types/todoTypes';

export function getTaskById(id: UniqueIdentifier, tasksByDate: Record<string, Task[]>) {
  const task = Object.entries(tasksByDate)
    .reduce((prev, current) => [...prev, ...current[1]], [] as Array<Task>)
    .find((t) => t.id === id);
  return task;
}

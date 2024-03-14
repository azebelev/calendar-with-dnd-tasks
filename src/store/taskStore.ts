import { UniqueIdentifier } from '@dnd-kit/core';
import { v4 as uuidv4, validate as checkIfUuid } from 'uuid';
import { create } from 'zustand';
import { localStorageSync } from '../localStorageDb/localStorageSync';
import { Task } from '../types/todoTypes';
import { filterTasks } from '../utils/filterTasks';
import { getTaskById } from '../utils/getTaskById';

type StoreItems = {
  tasksByDate: Record<string, Task[]>;
  currentFilter: string;
  filteredTasks: Record<string, Task[]>;
};
type StoreActions = {
  setFilter: (filter: string) => void;
  updateFilteredTasks: (tasks: Record<string, Task[]>) => void;
  addTask: (dto: Omit<Task, 'id'>) => void;
  removeTask: (dto: Pick<Task, 'id' | 'date'>) => void;
  updateTask: (dto: Task) => void;
  dragSync: (draggableId: UniqueIdentifier, destinationId: UniqueIdentifier) => void;
};

const initialData = localStorageSync.getData();
const minFilterLength = 2;

const useTaskStore = create<StoreItems & StoreActions>((set, get) => ({
  tasksByDate: initialData,
  currentFilter: '',
  filteredTasks: initialData,
  setFilter: (filterInput) => {
    if (filterInput.length > minFilterLength) {
      const filteredTasks = filterTasks(filterInput, get().tasksByDate);
      set({ currentFilter:filterInput, filteredTasks });
    }
  if(get().currentFilter.length > minFilterLength && filterInput.length <= minFilterLength) {
      set({ currentFilter:'', filteredTasks:get().tasksByDate });
  }
  },
  updateFilteredTasks: (tasks) => {
    const filter = get().currentFilter;
    if (filter.length > minFilterLength) {
      const filteredTasks = filterTasks(get().currentFilter, tasks);
      set({ filteredTasks });
    }
  },
  addTask: (dto) => {
    const tasksByDate = get().tasksByDate;
    if (tasksByDate[dto.date]) {
      tasksByDate[dto.date].push({ id: uuidv4(), ...dto });
    } else {
      tasksByDate[dto.date] = [{ id: uuidv4(), ...dto }];
    }
    set({ tasksByDate });
    get().updateFilteredTasks(tasksByDate)
    localStorageSync.sync(tasksByDate);
  },
  removeTask: (dto) => {
    const tasksByDate = get().tasksByDate;
    if (tasksByDate[dto.date]) {
      tasksByDate[dto.date] = tasksByDate[dto.date].filter((t) => t.id !== dto.id);
      set({ tasksByDate } );
      get().updateFilteredTasks(tasksByDate)
      localStorageSync.sync(tasksByDate);
    }
  },
  updateTask: (dto) => {
    const tasksByDate = get().tasksByDate;
    if (tasksByDate[dto.date]) {
      tasksByDate[dto.date] = tasksByDate[dto.date].map((e) => (e.id !== dto.id ? e : dto));
      set({ tasksByDate });
      get().updateFilteredTasks(tasksByDate)
      localStorageSync.sync(tasksByDate);
    }
  },
  dragSync: (draggableId, destinationId) => {
    if (!draggableId || !destinationId || destinationId === draggableId) return;

    const tasksByDate = get().tasksByDate;
    const draggableTask = getTaskById(draggableId, tasksByDate);
    if (!draggableTask) return;

    tasksByDate[draggableTask.date] = tasksByDate[draggableTask.date].filter(
      (t) => t.id !== draggableTask.id
    );

    const isOverTask = checkIfUuid(destinationId as string);

    if (isOverTask) {
      let indexOfDestination: number | undefined;
      const [containerKey, tasks] = Object.entries(tasksByDate).filter(([key, tasks]) =>
        tasks.some((t, i) => {
          if (t.id === destinationId) {
            indexOfDestination = i;
            return true;
          } else return false;
        })
      )[0];
      draggableTask.date = containerKey;
      if (indexOfDestination !== undefined) {
        tasks.splice(indexOfDestination, 0, draggableTask);
        tasksByDate[containerKey] = tasks;
        set({ tasksByDate });
        get().updateFilteredTasks(tasksByDate)
        localStorageSync.sync(tasksByDate);
      }
    } else {
      tasksByDate[draggableTask.date] = tasksByDate[draggableTask?.date].filter(
        (t) => t.id !== draggableTask.id
      );
      draggableTask.date = destinationId as string;
      if (!tasksByDate[destinationId]) tasksByDate[destinationId] = [];
      tasksByDate[destinationId].push(draggableTask);
      set({ tasksByDate });
      get().updateFilteredTasks(tasksByDate)
      localStorageSync.sync(tasksByDate);
    }
  },
}));

export default useTaskStore;

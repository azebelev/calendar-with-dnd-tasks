import { TaskLabelEnum } from '../enums/taskLabelEnum';

export type Task = { id: string; text: string; labels: TaskLabelEnum[]; date: string };

import { Task } from './task.model';
import { Stage } from './workflow.model';

export class Column {
    constructor(public stage: Stage, public tasks: Task[]) {}
}
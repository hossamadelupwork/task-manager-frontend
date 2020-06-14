import { Stage } from './workflow.model';

export interface Task {
    id : string;
    name : string;
    description : string;
    stage : Stage
}
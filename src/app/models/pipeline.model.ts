import { Workflow } from './workflow.model';
import { Task } from './task.model';

export interface Pipeline {
    id:string;
    name : string;
    workflow : Workflow;
    tasks ?: Task[]
}
  
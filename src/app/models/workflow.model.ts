export interface Workflow {
    id : string;
    name : string;
    stages : Stage[]
}

export interface Stage {
    id : string;
    name : string;
}
import { Component, OnInit } from '@angular/core';
import { CreateTaskFormComponent } from '../create-task-form/create-task-form.component';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Column } from 'src/app/models/column.model';
import { Board } from 'src/app/models/board.model';
import { ActivatedRoute } from '@angular/router';
import { PipelineService } from 'src/app/providers/pipeline/pipeline.service';
import { Pipeline } from 'src/app/models/pipeline.model';
import { Stage } from 'src/app/models/workflow.model';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/providers/task/task.service';
import { PostTask } from 'src/app/models/post-task.model';

@Component({
  selector: 'app-swimlanes',
  templateUrl: './swimlanes.component.html',
  styleUrls: ['./swimlanes.component.scss']
})
export class SwimlanesComponent implements OnInit {

  pipeline : Pipeline ;
  board: Board ;
  // new Board('Test Board', [
  //   new Column('Ideas', [
  //     "Some random idea",
  //     "This is another random idea",
  //     "build an awesome application"
  //   ]),
  //   new Column('Research', [
  //     "Lorem ipsum",
  //     "foo",
  //     "This was in the 'Research' column"
  //   ]),
  //   new Column('Todo', [
  //     'Get to work',
  //     'Pick up groceries',
  //     'Go home',
  //     'Fall asleep'
  //   ]),
  //   new Column('Done', [
  //     'Get up',
  //     'Brush teeth',
  //     'Take a shower',
  //     'Check e-mail',
  //     'Walk dog'
  //   ])
  // ]);
  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private pipelineService : PipelineService ,
              private taskService : TaskService ) { }

  ngOnInit(): void {
    let pipelineId = this.route.snapshot.paramMap.get('id');
    this.getpipelineDetails(pipelineId);
  }

  async getpipelineDetails(pipelineId : string){
    this.pipeline = await this.pipelineService.getPipelineDetails(pipelineId) ;
    if(this.pipeline)
      this.updateBoard();
  }

  private updateBoard(){
    let columns : Column[] = [];
    this.pipeline.workflow.stages.forEach((stage : Stage)=>{
      columns.push(new Column(stage,this.filerTasksByStage(stage)));
    });
    this.board = new Board(this.pipeline.name , columns);  
  }


  private filerTasksByStage(stage : Stage) : Task[]{
    return this.pipeline.tasks.filter((task : Task)=>{
      return task.stage.id == stage.id
    });
  }

  drop(event: CdkDragDrop<string[]>,stage : Stage) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateTaskStage(event.container.data[event.currentIndex],stage);
    
    }
  }

  async updateTaskStage(task : any , stage : Stage){
    let params : PostTask = {
      name : task.name ,
      description : task.description ,
      stageId : stage.id
    };
    await this.taskService.edit(task.id, params);
  }

  openDialog(stageId : string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      pipelineId : this.pipeline.id ,
      stageId : stageId ,
      stages : this.pipeline.workflow.stages
    };

    const dialogRef = this.dialog.open(CreateTaskFormComponent,dialogConfig);
    dialogRef.afterClosed().subscribe((task : Task) => {
      console.log('The dialog was closed');
      this.pipeline.tasks.push(task);
      this.updateBoard();
    });
  }

}

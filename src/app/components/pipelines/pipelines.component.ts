import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreatePipelineFormComponent } from '../create-pipeline-form/create-pipeline-form.component';
import { PipelineService } from 'src/app/providers/pipeline/pipeline.service';
import { Pipeline } from 'src/app/models/pipeline.model';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss']
})
export class PipelinesComponent implements OnInit {
  pipelines : Pipeline[];
  constructor(public dialog: MatDialog,
              private pipelineService : PipelineService) { }

  ngOnInit(): void {
    this.getPipelines();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePipelineFormComponent);

    dialogRef.afterClosed().subscribe((pipeline : Pipeline) => {
      console.log('The dialog was closed');
      if(pipeline)
        this.pipelines.push(pipeline);
    });
  }

  async getPipelines(){
    this.pipelines = await this.pipelineService.get();
  }


}

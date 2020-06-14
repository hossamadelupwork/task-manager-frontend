import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostPipeline } from 'src/app/models/post-pipeline.model';
import { WorkflowService } from 'src/app/providers/workflow/workflow.service';
import { Workflow } from 'src/app/models/workflow.model';
import { PipelineService } from 'src/app/providers/pipeline/pipeline.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Pipeline } from 'src/app/models/pipeline.model';

@Component({
  selector: 'app-create-pipeline-form',
  templateUrl: './create-pipeline-form.component.html',
  styleUrls: ['./create-pipeline-form.component.scss']
})
export class CreatePipelineFormComponent implements OnInit {
  pipelineForm: FormGroup;
  workflows: Workflow[];
  constructor(private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private workflowService : WorkflowService,
              private pipelineService : PipelineService,
              private dialogRef: MatDialogRef<CreatePipelineFormComponent>) { }

  ngOnInit(): void {
    this.getWorkflows();
    this.buildForm();
  }

  private buildForm(){
    this.pipelineForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.required])
      ],
      workflowId : [
        '',
        Validators.compose([Validators.required])
      ],
    });
  }

  async create(){
    if (this.pipelineForm.valid) {
      this.spinner.show();
      const params : PostPipeline = this.pipelineForm.value ;
      const result :Pipeline = await this.pipelineService.create(params);
      this.dialogRef.close(result);
      this.spinner.hide();
    }
  }

  async getWorkflows(){
    this.workflows = await this.workflowService.get();
  }


}

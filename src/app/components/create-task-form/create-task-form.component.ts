import { TaskService } from './../../providers/task/task.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostTask } from 'src/app/models/post-task.model';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { Stage } from 'src/app/models/workflow.model';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {
  taskForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private taskService: TaskService,
              private dialogRef: MatDialogRef<CreateTaskFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {pipelineId : string , stageId : string , stages : Stage[]}
) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.taskForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.required])
      ],
      description : [
        '',
        Validators.compose([Validators.required])
      ],
      stageId : [
        this.data.stageId,
        Validators.compose([Validators.required])
      ],
    });
  }

  async createTask(){
    if (this.taskForm.valid) {
      this.spinner.show();
      const params : PostTask = this.taskForm.value ;
      const result : Task = await this.taskService.create(this.data.pipelineId,params);
      if(result)
        this.dialogRef.close(result);
      this.spinner.hide();
    }
  }

}

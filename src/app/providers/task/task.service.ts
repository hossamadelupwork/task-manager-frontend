import { Injectable } from '@angular/core';
import { ApiService, requestMethods } from '../api/api.service';
import { API_CONFIG } from 'src/app/app.config';
import { PostTask } from 'src/app/models/post-task.model';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService : ApiService) { }


  async get(taskId : string) : Promise<Task> {
    const url = API_CONFIG.DOMAIN + API_CONFIG.TASKS + '/' + taskId ;
    return await this.apiService.fetch(requestMethods.GET, url , null , true );
  }

  async create(pipelineId : string , params : PostTask) : Promise<Task> {
    const url = API_CONFIG.DOMAIN  + API_CONFIG.PIPELINES + '/' + pipelineId + API_CONFIG.TASKS ;
    return await this.apiService.fetch(requestMethods.POST, url , params  );
  }

  async edit(taskId : string , params : PostTask) : Promise<Task> {
    const url = API_CONFIG.DOMAIN + API_CONFIG.TASKS + '/' + taskId ;
    return await this.apiService.fetch(requestMethods.PUT, url , params  );
  }

  async delete(taskId : string ) : Promise<any> {
    const url = API_CONFIG.DOMAIN + API_CONFIG.TASKS + '/' + taskId ;
    return await this.apiService.fetch(requestMethods.DELETE, url , null  );
  }

}

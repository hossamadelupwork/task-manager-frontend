import { Injectable } from '@angular/core';
import { ApiService, requestMethods } from '../api/api.service';
import { API_CONFIG } from 'src/app/app.config';
import { Workflow } from 'src/app/models/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private apiService : ApiService) { }


  async get(): Promise<Workflow[]>{
    const url = API_CONFIG.DOMAIN + API_CONFIG.WORKFLOWS ;
    return await this.apiService.fetch(requestMethods.GET, url , null , true );
  }
}

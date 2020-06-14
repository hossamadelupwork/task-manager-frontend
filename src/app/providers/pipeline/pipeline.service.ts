import { Injectable } from '@angular/core';
import { ApiService, requestMethods } from '../api/api.service';
import { PostPipeline } from 'src/app/models/post-pipeline.model';
import { API_CONFIG } from 'src/app/app.config';
import { Pipeline } from 'src/app/models/pipeline.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {

  constructor(private apiService : ApiService) { }

  async create(params:PostPipeline): Promise<Pipeline>{
    const url = API_CONFIG.DOMAIN + API_CONFIG.PIPELINES ;
    return await this.apiService.fetch(requestMethods.POST, url , params , true );
  }

  async get() : Promise<Pipeline[]>{
    const url = API_CONFIG.DOMAIN + API_CONFIG.PIPELINES ;
    return await this.apiService.fetch(requestMethods.GET, url , null , true );
  }

  async getPipelineDetails(pipelineId : string) : Promise<Pipeline>{
    const url = API_CONFIG.DOMAIN + API_CONFIG.PIPELINES + '/' + pipelineId ;
    return await this.apiService.fetch(requestMethods.GET, url , null , true );
  }
}

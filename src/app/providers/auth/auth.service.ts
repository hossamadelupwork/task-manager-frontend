import { Injectable } from '@angular/core';
import { ApiService, requestMethods } from '../api/api.service';
import { API_CONFIG } from 'src/app/app.config';
import { Login } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService : ApiService,
              private storageService : StorageService) { }


  // user login
  async login(credentials : Login): Promise<User>{
    const url = API_CONFIG.DOMAIN + API_CONFIG.LOGIN ;
    const user : User = await this.apiService.fetch(requestMethods.POST, url , credentials , false );
    if(user)
      this.storageService.setToken(user.token);
    return user;
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';




export enum requestMethods {
  POST,
  GET,
  DELETE,
  PUT
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ,
               private storageService : StorageService) {

  }



   /**
   * Fetch api
   * Check token expiry before each call
   * Retry the request if token is expired
   * @param method
   * @param url
   * @param params
   * @param isToken
   */

  fetch(method, url, params?, isToken = true) {
    let fetchObservable: Observable<any>,
      options: any = {},
      headers: any = {'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'X-Requested-With' :"XMLHttpRequest"};
    if (isToken) 
      headers['Authorization'] = "Bearer " + this.storageService.getToken();
  
    options.headers = new HttpHeaders(headers);
    fetchObservable = this.getFetchMethod(method, url, params, options);

    return fetchObservable.toPromise()
    .catch((err) => console.log('error',err) );
  }
  /**
   * Get httpClient method for request Method
   * @param method
   * @param url
   * @param params
   * @param options
   * @returns {Observable<any>}
   */
  getFetchMethod(method, url, params, options) {
    let fetchObservable: Observable<any>;
    switch (method) {
      case requestMethods.POST:
        fetchObservable = this.http.post(url, params, options);
        break;
      case requestMethods.DELETE:
        options.params = params;
        fetchObservable = this.http.delete(url, options);
        break;
      case requestMethods.PUT:
        fetchObservable = this.http.put(url, params ,options );
        break;
      default:
        options.params = params;
        fetchObservable = this.http.get(url, options);
    }
    return fetchObservable;
  }


}

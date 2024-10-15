import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CourseListModel } from '../../dashboard/model/course-list.model';



@Injectable({
  providedIn: 'root'
})
export class SideLoginService {
  private url = 'https://elearning-be-h3lj.onrender.com';
  // private url = 'http://localhost:3000';
  
 
  constructor(public httpClient: HttpClient) {
  }

  public getLogin(data:any){
    const body = {
      email: data.uname,
      password: data.password
    };
    const response = this.httpClient.post<any>(`${this.url}/auth/login`,body);

    return response
    

    
  }


  

  


  

  

}
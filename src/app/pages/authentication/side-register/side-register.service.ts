import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CourseListModel } from '../../dashboard/model/course-list.model';



@Injectable({
  providedIn: 'root'
})
export class SideRegisterService {
  // private url = 'https://elearning-be-h3lj.onrender.com';
  // private url = 'http://localhost:3000';
  private url = 'http://103.82.38.96:3000'
  
 
  constructor(public httpClient: HttpClient) {
  }

  public getRegister(data:any){
    
    const response = this.httpClient.post<any>(`${this.url}/auth/singup`,data);

    return response
    

    
  }


  

  


  

  

}
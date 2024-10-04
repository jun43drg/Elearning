import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { dashboardData } from './dashboardData';
import { courseList } from './course-data';


@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  blogPosts: any[] = [];
  
  detailId: string = '';

  constructor(public http: HttpClient) {
  }

  public getBlog(): Observable<any> {
    return of(dashboardData);
  }


  public course = courseList;
  public getCourse(): any[] {
    return this.course;
  }

  

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { dashboardData } from './dashboardData';


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

  

}
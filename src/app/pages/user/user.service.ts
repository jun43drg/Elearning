import { Injectable } from "@angular/core";

import { BehaviorSubject, catchError, debounceTime, delay, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";



@Injectable({
    providedIn: 'root'
})
export class UserService {
  private url = 'https://elearning-be-h3lj.onrender.com'
  // private url = 'http://localhost:3000';

  private userListDisplay =
  new BehaviorSubject<any | null>(null);
  public userList$: Observable<any | null> =
    this.userListDisplay.asObservable();
  
  private readonly totalRecord = new BehaviorSubject<number>(0);
  public readonly totalRecord$ = this.totalRecord.asObservable();

constructor(public httpClient: HttpClient, 
            private router: Router,
            
          ) {
}




deleteUser(body: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.post<any>(`${this.url}/user/delete`, body, { headers: headers });
  return response.pipe(tap((res)=>{}),
  catchError((error) => {
    console.log(error.statusText);
    if (error.statusText === 'Unauthorized') {
      localStorage.clear();
      this.router.navigate(['/authentication/login']);
    }
    return throwError(() => error);
  })
  )
}


updateUser(body: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.post<any>(`${this.url}/user/update`, body, { headers: headers });
  return response.pipe(tap((res)=>{}),
  catchError((error) => {
    console.log(error.statusText);
    if (error.statusText === 'Unauthorized') {
      localStorage.clear();
      this.router.navigate(['/authentication/login']);
      }
    return throwError(() => error);
  })
  )
}

getListRoleByUserId(id: number) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.get<any>(`${this.url}/user/list-role-by-user?userId=${id}`, { headers: headers });
  return response.pipe(tap((res)=>{}),
  catchError((error) => {
    console.log(error.statusText);
    if (error.statusText === 'Unauthorized') {
      localStorage.clear();
      this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  );
}


createUser(body: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.post<any>(`${this.url}/user/create`, body, { headers: headers });
  return response.pipe(
    tap((res)=>{
      console.log(res)
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  )
}

getUserList(filter: any = { page: 1, size: 10, search: '' }) {
 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.get<any>(`${this.url}/user/search-by-filter?page=${filter.page}&size=${filter.size}&search=${filter.search}`,{ headers: headers });
  return response.pipe(    
    tap((res)=>{
      this.userListDisplay.next(res.data);
      this.totalRecord.next(res.total)
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  )
}


}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { dashboardData } from './dashboardData';
import { courseList } from './course-data';
import { CourseListModel } from './model/course-list.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  blogPosts: any[] = [];
  
  detailId: string = '';
  private url = 'https://elearning-be-h3lj.onrender.com'
  // private url = 'http://localhost:3000';
  public token = localStorage.getItem('tokens');
  // private sourceList: CourseListModel =
  //   new CourseListModel();

  //course 
  private sourceListDisplay =
    new BehaviorSubject<CourseListModel | null>(null);
  public sourceList$: Observable<CourseListModel | null> =
    this.sourceListDisplay.asObservable();

  // course detail
  private sourceDetailListDisplay =
    new BehaviorSubject<CourseListModel | null>(null);
  public sourceDetailList$: Observable<CourseListModel | null> =
    this.sourceDetailListDisplay.asObservable();

  // course content detail
  private sourceContentDetailListDisplay =
  new BehaviorSubject<CourseListModel | null>(null);
  public sourceContentDetailList$: Observable<CourseListModel | null> =
  this.sourceContentDetailListDisplay.asObservable();

// Thêm token vào headers
public headers = new HttpHeaders({
  'Authorization': `Bearer ${this.token}`
});

  constructor(public httpClient: HttpClient, private router: Router) {
  }

  deleteCourseContentDetail(data:any) {
    const response = this.httpClient.post<any>(`${this.url}/course-content-detail/delete`,data,{ headers: this.headers });
    return response.pipe(
      tap((res)=>{  
      
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

  updateCourseContentDetail(data:any) {
    const response = this.httpClient.post<any>(`${this.url}/course-content-detail/update`,data,{ headers: this.headers });
    return response.pipe(
      tap((res)=>{
      
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

  
  createCourseContentDetail(data:any) {
    console.log('data',data)
    
    const response = this.httpClient.post<any>(`${this.url}/course-content-detail/create`,data,{ headers: this.headers });

    return response.pipe(
      tap((res)=>{
      
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

  getAllCourseContentDetail(course_detail_id:any) {
    const response = this.httpClient.get<any>(`${this.url}/course-content-detail/search-by-filter`,{ params: { course_detail_id: course_detail_id },headers: this.headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.sourceContentDetailListDisplay.next(res.data);
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

  createCourseDetail(data:any) {
    const response = this.httpClient.post<any>(`${this.url}/course-detail/create`,data,{ headers: this.headers });

    return response.pipe(
      tap((res)=>{
      
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

  updateCourseDetail(data:any) {
    console.log('data',data)
    
    const response = this.httpClient.post<any>(`${this.url}/course-detail/update`,data,{ headers: this.headers });

    return response.pipe(
      tap((res)=>{
      
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

  getAllCourseDetail(course_id:any) {
    const response = this.httpClient.get<any>(`${this.url}/course-detail/search-by-filter`,{ params: { course_id: course_id },headers: this.headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.sourceDetailListDisplay.next(res.data);
      }),
      catchError((error) => {
        console.log(error.statusText);
        
        return throwError(() => error);
      })
    )
  }

  public getBlog(): Observable<any> {
    return of(dashboardData);
  }

  deleteCourse(body:any) {
    const response = this.httpClient.post<any>(`${this.url}/course/delete`,body,{ headers: this.headers });
    return response.pipe(
      tap((res)=>{
      
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
  
  

  getAllCourse() {
    const response = this.httpClient.get<any>(`${this.url}/course/search-by-filter`,{ headers: this.headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.sourceListDisplay.next(res.data);
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

  createCourse(data:any) {


    const response = this.httpClient.post<any>(`${this.url}/course/create`,data,{ headers: this.headers });

    return response.pipe(
      tap((res)=>{
      
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

  updateCourse(data:any) {
    const response = this.httpClient.post<any>(`${this.url}/course/update`,data,{ headers: this.headers });

    return response.pipe(
      tap((res)=>{
      
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


  public course = courseList;
  public getCourse(): any[] {
    return this.course;
  }

  

}
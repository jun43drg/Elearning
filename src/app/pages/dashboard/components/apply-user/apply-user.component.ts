import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { catchError, forkJoin, map, merge, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { dashboardService } from '../../dashboard.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';




@Component({
  selector: 'app-apply-user',
  standalone: true,
  imports: [MatDialogModule, FormsModule, TablerIconsModule, MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule,
    MaterialModule,    
    MatNativeDateModule,
    NgScrollbarModule,
    CommonModule,
  ],
  templateUrl: './apply-user.component.html',
  styleUrl: './apply-user.component.scss'
})
export class ApplyUserComponent {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);

    searchText: any;
  displayedColumns: string[] = [
    '#',    
    'name_user',
    'email',
    'mobie',
    'gender',    
    'action'
  ];
  displayedColumnsAdd: string[] = [
    '#',   
    'action', 
    'name_user',
    'email',
    'mobie',
    'gender',  
  ];
  private subscription1!: Subscription;
  private subscription2!: Subscription;
  protected listUserApplyCourseList$!: Observable<any | null>;
  protected listUserNotApplyCourseList$!: Observable<any | null>;
  public loadingSpinner = false;
  constructor(
    public dashboardService: dashboardService,
    public dialogRef: MatDialogRef<ApplyUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog   
  ) { }

 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  
  ngOnInit(): void {
    console.log('isButtonPermission', this.isButtonPermission());
    console.log('this.datazz', this.data)
    
    this.loadingSpinner = true;
    if (this.dashboardService.blogPosts.length === 0) {
      this.dashboardService
        .getBlog()
        .subscribe((d: any) => (this.dashboardService.blogPosts = d));
    }
    
    this.listUserApplyCourseList$ = this.dashboardService.listUserApplyCourseList$; 
    this.listUserNotApplyCourseList$ = this.dashboardService.listUserNotApplyCourseList$; 
    this.subscription1 = this.dashboardService.getAllUserApplyCourse(this.data.id).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    );
    this.subscription2 = this.dashboardService.getAllUserNotApplyCourse(this.data.id).subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    );
    
   
  }
  openDialogRemove(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: any,
    action: string
  ): void {
    this.dialog.open(AppDialogOverviewComponent, {
      width: '290px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        data: data,
        action: action,
        courseId: this.data.id,
        registered: this.data.registered
      }
      
      
    });
  } 

  ngOnDestroy(): void {   
    if (this.subscription1  ) {      
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {      
      this.subscription2.unsubscribe();
    }
  } 

  isButtonPermission(): boolean {
    const role = JSON.parse(localStorage.getItem('role') || '[]');
    return ['Admin', 'Teacher'].some(r => role.includes(r));
  }
  

  openDialog(action: string, obj: any): void {
    obj.action = action;  
    
  }

}




@Component({
  selector: 'dialog-overview',
  standalone: true,
  imports: [
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent, 
    MatButtonModule,
    MatProgressSpinnerModule, 
    MatIconModule, 
    CommonModule, 
    MatDividerModule
  ],
  templateUrl: 'dialog-overview.component.html',
})
export class AppDialogOverviewComponent {
  private _snackBar = inject(MatSnackBar)
  constructor(
   
    public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  
    public dashboardService: dashboardService,   
  
  ) { }
  public loadingSpinner: boolean = false;
  save(): void {
    console.log('this.data', this.data)
    this.loadingSpinner = true
   
    const body = {
      course_id: this.data.courseId,
      user_id: this.data.data.id,
      registered: this.data.registered
    }
    
    if(this.data.action == 'add'){
      this.dashboardService.addUserApplyCourse(body).subscribe(
        (res: any) => {        
          if (res) {  
            forkJoin({
              usersApplied: this.dashboardService.getAllUserApplyCourse(this.data.courseId),
              usersNotApplied: this.dashboardService.getAllUserNotApplyCourse(this.data.courseId),
              getAllCourse: this.dashboardService.getAllCourse()
            }).subscribe(results => {
              if(results){
                this.loadingSpinner = false;
                this.openSnackBar('Add user success', 'success');
                this.dialogRef.close();
              }       
           
            }, error => {
              console.error('Error fetching data', error);
            });     
          }        
        },
        (error: any) => {
          
          this.openSnackBar(error.error.message, 'error');
          this.loadingSpinner = false; 
          console.error('Error fetching courses:', error);
       
         
          this.dialogRef.close({ event: 'error', message: 'Failed to load courses' });
        }  
        
      )
    }else{
      this.dashboardService.removeUserApplyCourse(body).subscribe(
        (res: any) => {        
          if (res) {  
            forkJoin({
              usersApplied: this.dashboardService.getAllUserApplyCourse(this.data.courseId),
              usersNotApplied: this.dashboardService.getAllUserNotApplyCourse(this.data.courseId),
              getAllCourse: this.dashboardService.getAllCourse()
            }).subscribe(results => {
              if(results){
                this.openSnackBar('Remove user success', 'success');
                this.loadingSpinner = false;
                this.dialogRef.close();
              }       
            }, error => {
              console.error('Error fetching data', error);
            });     
          }
        },
        (error: any) => {
          this.openSnackBar(error.error.message, 'error');
          this.loadingSpinner = false; 
          this.dialogRef.close();
          console.error('Error fetching courses:', error);
        }
      )

    }
  }

  durationInSeconds = 3;

  openSnackBar(data:any, status: string) {

    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message: data, status: status  }, // Truyền dữ liệu
    }); 
  }

  cancle(): void {
    console.log('cancle')
  }
}




@Component({
  selector: 'sussess-snackbar',
  template: `
   <span [class]="data.status">{{ data.message }}</span>

  `,
  styles: `
    .success {
      color: #13deb9 !important;
    }
    .error {
      color: red !important;
    }
  `,
  standalone: true,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}






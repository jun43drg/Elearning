import { Component, Inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { dashboardService } from '../../dashboard.service';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CourseListModel } from '../../model/course-list.model';
import { Observable, Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    TablerIconsModule,
    MatDividerModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  title: any;
  blogDetail: any = null;

  istoggleReply = true;
  private subscription!: Subscription;
  protected sourceList$!: Observable<any | null>;
  public loadingSpinner = true;

  toggleReply() {
    this.istoggleReply = !this.istoggleReply;
  }
  activeRoute: any = this.router.url.split('/').pop();

  constructor(
    public router: Router,
    activatedRouter: ActivatedRoute,
    public dashboardService: dashboardService,
    public dialog: MatDialog,
    // public datePipe: DatePipe
  ) {
    
  }

  openDialogRemove(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AppDialogOverviewComponent, {
      width: '290px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  

  

  selectCourse(b: string) {
   
    this.dashboardService.detailId = b;
    // this.router.navigate(['dashboard/dashboardDetail', b]);
    this.router.navigate(['dashboard',b]);
  }

  converImage(imagePath: any) {
    
    // const baseUrl = 'http://localhost:3000';
    const baseUrl = 'https://elearning-be-h3lj.onrender.com'; 
    // URL cơ sở của bạn
  // Loại bỏ 'uploads' khỏi đường dẫn
  const cleanedImagePath = imagePath.replace('uploads/', ''); 
  return `${baseUrl}/${cleanedImagePath}`;
  }

  ngOnInit(): void {
    this.loadingSpinner = true;
    if (this.dashboardService.blogPosts.length === 0) {
      this.dashboardService
        .getBlog()
        .subscribe((d: any) => (this.dashboardService.blogPosts = d));
    }

    this.sourceList$ = this.dashboardService.sourceList$; 
    this.subscription = this.dashboardService.getAllCourse().subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    );
   
  }

  applyFilter(filterValue: string): void {
    
  }

  ngDestroy(): void {
   
    if (this.subscription) {
      
      this.subscription.unsubscribe();
    }
  }

  

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppDialogCourseComponent, {
      data: obj,
     
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result.event === 'Add') {
      //   this.addRowData(result.data);
      // } else if (result.event === 'Update') {
      //   this.updateRowData(result.data);
      // } else if (result.event === 'Delete') {
      //   this.deleteRowData(result.data);
      // }
    });
  }
}










@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-coures',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: 'add-dialog-course.html',
  providers: [DatePipe],
})
// tslint:disable-next-line: component-class-suffix
export class AppDialogCourseComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  public imageCurrent: any;
  public loadingSpinner = false;

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppDialogCourseComponent>,
    public dashboardService: dashboardService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd'
      );
    }
    if (this.local_data.image === undefined) {
      this.local_data.image = '';
    }
  }

  ngOnInit(): void {
    
  }
  
  
  saveCreate(): void {
    this.loadingSpinner = true
    const formData = new FormData();
    if (this.imageCurrent) {      
      formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    } else {
      const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });
      formData.append('image', emptyFile); 
    }    
    formData.append('title', this.local_data.title);
    formData.append('description', this.local_data.description);
    formData.append('time_study', this.local_data.time_study);
    formData.append('status', this.local_data.status);
    // Log the contents of FormData
    this.dashboardService.createCourse(formData).subscribe(
      (res: any) => {        
        if (res) {
          this.dashboardService.getAllCourse().subscribe(
            (res: any) => {
             if(res){
              this.loadingSpinner = false;
              this.dialogRef.close({ event: this.action, data: this.local_data });
             }
            }
          );          
        }        
      }
    );
    
  }

  saveEdit(): void {
    
    this.loadingSpinner = true
    const formData = new FormData();
    if (this.imageCurrent) {      
      formData.append('image', new File([this.imageCurrent], this.imageCurrent.name, { type: this.imageCurrent.type }));
    } else {
      
      formData.append('image', this.local_data.image); 
      
      
    } 
    formData.append('id', this.local_data.id);
    formData.append('title', this.local_data.title);
    formData.append('description', this.local_data.description);
    formData.append('time_study', this.local_data.time_study);
    formData.append('status', this.local_data.status);

   
    this.dashboardService.updateCourse(formData).subscribe(
        (res: any) => {        
          if (res) {
            this.dashboardService.getAllCourse().subscribe(
              (res: any) => {
               if(res){
                this.loadingSpinner = false;
                this.dialogRef.close({ event: this.action, data: this.local_data });
               }
              }
            );          
          }        
        }
      );
    
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  converImage(imagePath: any) {
    const baseUrl = 'http://localhost:3000';
    let cleanedImagePath = null
    // const baseUrl = 'https://elearning-be-h3lj.onrender.com'; 
    // URL cơ sở của bạn
    // Loại bỏ 'uploads' khỏi đường dẫn
  if(imagePath.includes('uploads')){
   
    const format = imagePath.replace('uploads/', ''); 
    cleanedImagePath = `${baseUrl}/${format}`
  }else{

    cleanedImagePath = imagePath;
  }
  
  return cleanedImagePath
  }

  selectFile(event: any): void {
  
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    this.imageCurrent = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.image = reader.result;
    };
  }
}




@Component({
  selector: 'dialog-overview',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: 'dialog-overview.component.html',
})
export class AppDialogOverviewComponent {
  constructor(public dialogRef: MatDialogRef<AppDialogOverviewComponent>) {}
}


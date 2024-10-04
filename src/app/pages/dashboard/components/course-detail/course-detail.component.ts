import { Component, Inject, Optional } from '@angular/core';


// import { Component } from '@angular/core';
// import { CourseService } from './course.service';
// import { course } from './course';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { dashboardService } from '../../dashboard.service';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    MatCardModule,
    TablerIconsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})

export class CourseDetailComponent {
  courseList: any[] = [];
  selectedCategory = 'All';

  constructor(private courseService: dashboardService,  public dialog: MatDialog,) {
    this.courseList = this.courseService.getCourse();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.courseList = this.filter(filterValue);
  }

  filter(v: string): any {
    return this.courseService
      .getCourse()
      .filter(
        (x) => x.courseName.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
  }

  ddlChange(ob: any): void {
    const filterValue = ob.value;
    if (filterValue === 'All') {
      this.courseList = this.courseService.getCourse();
    } else {
      this.courseList = this.courseService
        .getCourse()
        // tslint:disable-next-line: no-shadowed-variable
        .filter((course) => course.courseFramework === filterValue);
    }
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppDialogCourseDetailComponent, {
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
  selector: 'add-dialog-course-detail',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: 'add-dialog-course-detail.html',
  providers: [DatePipe],
})
// tslint:disable-next-line: component-class-suffix
export class AppDialogCourseDetailComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppDialogCourseDetailComponent>,
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
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = '';
    }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
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
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
}





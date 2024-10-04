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
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    TablerIconsModule,
    MatDividerModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  title: any;
  blogDetail: any = null;

  istoggleReply = true;

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

  selectCourse(b: string) {
    console.log('b', b);
    this.dashboardService.detailId = b;
    // this.router.navigate(['dashboard/dashboardDetail', b]);
    this.router.navigate(['dashboard',b]);
  }

  ngOnInit(): void {
    if (this.dashboardService.blogPosts.length === 0) {
      this.dashboardService
        .getBlog()
        .subscribe((d: any) => (this.dashboardService.blogPosts = d));
    }
  }

  applyFilter(filterValue: string): void {
    
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
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
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

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppDialogCourseComponent>,
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


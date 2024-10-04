import { Component } from '@angular/core';


// import { Component } from '@angular/core';
// import { CourseService } from './course.service';
// import { course } from './course';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { dashboardService } from '../../dashboard.service';

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

  constructor(private courseService: dashboardService) {
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
}

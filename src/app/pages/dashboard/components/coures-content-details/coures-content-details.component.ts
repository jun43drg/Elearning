import { Component } from '@angular/core';
import { dashboardService } from '../../dashboard.service';



import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { courseContentList } from '../../coures-content-details-data';




@Component({
  selector: 'coures-content-details',
  standalone: true,
  imports: [
    MatCardModule, TablerIconsModule, MatStepperModule, MatInputModule, MatButtonModule, MatDividerModule, MatChipsModule, MatSelectModule
  ],
  templateUrl: './coures-content-details.component.html',
  styleUrl: './coures-content-details.component.scss'
})
export class CourseContentDetailsComponent {
  id: any;
  courseDetail: any;
  istoggleReply: any;
  blogDetail: any = [
    {
      id: 1,
      time: '2 mins Read',
      imgSrc: '/assets/images/dashboar/1.png',
      user: '/assets/images/profile/user-3.jpg',
      title: 'Introduction to Structured Data',
      views: '9,125',
      category: 'BUS500',
      comments: 12,
      featuredPost: false,
      date: 'Sat, Dec 23',
    }
  ];
  isEdit: boolean = false;
  isAdd: boolean = false;
  dataContentList: any = courseContentList
  constructor(activatedRouter: ActivatedRoute, public dashboardService: dashboardService) {
    
    this.id = activatedRouter?.snapshot?.paramMap?.get('id');
    console.log('this.dataContentList',this.dataContentList);
    // this.blogDetail = dashboardService
    //   .getCourse()
    //   .filter((x) => x?.Id === +this.id)[0];
  }

  toggleReply(){}

}

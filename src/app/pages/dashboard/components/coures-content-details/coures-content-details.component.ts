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
import { DomSanitizer } from '@angular/platform-browser';




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
  local_data: any;
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
  constructor(activatedRouter: ActivatedRoute, public dashboardService: dashboardService, private sanitizer: DomSanitizer) {
    
    this.id = activatedRouter?.snapshot?.paramMap?.get('id');
    console.log('this.dataContentList',this.dataContentList);
    // this.blogDetail = dashboardService
    //   .getCourse()
    //   .filter((x) => x?.Id === +this.id)[0];
  }

  toggleReply(){}

  selectFile(event: any,idx:any): void {
    console.log('idx',idx);
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
      this.dataContentList[idx].value = reader.result;
      // this.dataContentList[idx].value = reader.result
    };
  }

  safeUrl(res:any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(res);
  }

}

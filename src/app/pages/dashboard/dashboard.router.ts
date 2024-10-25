import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseContentDetailsComponent } from './components/coures-content-details/coures-content-details.component';


// cas
// import { AppDashboard1Component } from './dashboard1/dashboard1.component';
// import { AppDashboard2Component } from './dashboard2/dashboard2.component';
// import { AppHomeCasComponent } from './home-cas/home-cas.component';
// import { AppCallResultComponent } from './call-result/call-result.component';
// import { CampaignComponent } from './campaign/campaign.component';
// import { UsersComponent } from './users/users.component';
// import { SettingComponent } from './setting/setting.component';
// import { CustomerComponent } from './customer/customer.component';
// import { HoComponent } from './ho/ho.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          urls: [
            { title: 'Dashboard', url: '/Dashboard' },
            // { title: 'Chat' },
          ],
        },
      },
      {
        path: 'course-content-detail/:id',
        component: CourseContentDetailsComponent,
        data: {
          title: 'Course Content Detail',
          urls: [
            { title: 'Course', url: `/dashboard` },
            { title: 'Course Content Detail' },
          ],
        },
      },
      {
        path: ':id',
        component: CourseDetailComponent,
        data: {
          title: 'Course Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Course Detail' },
          ],
        },
      },

    ]
    
  },
 
];

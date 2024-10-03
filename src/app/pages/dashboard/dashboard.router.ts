import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/details/details.component';


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
        path: ':id',
        component: DetailsComponent,
        data: {
          title: 'Course Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Course Detail' },
          ],
        },
      },

    ]
    
  },
 
];

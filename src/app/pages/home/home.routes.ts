import { Routes } from '@angular/router';

// dashboards
import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';

export const Home: Routes = [
  {
    path: '',
    title: 'Home',
    component: AppDashboard1Component,
    data: {
      title: 'Analytical',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Analytical' },
      ],
    },
   
  },
];

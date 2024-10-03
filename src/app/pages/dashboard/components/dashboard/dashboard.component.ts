import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { dashboardService } from '../../dashboard.service';

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
    public dashboardService: dashboardService
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
}

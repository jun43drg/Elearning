import { Component } from '@angular/core';
import { dashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  constructor(
    public dashboardService: dashboardService
  ) { }

}

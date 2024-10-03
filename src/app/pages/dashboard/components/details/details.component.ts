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

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatCardModule, TablerIconsModule, MatStepperModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id: any;
  courseDetail: any;
  constructor(activatedRouter: ActivatedRoute, public dashboardService: dashboardService) {
    
    // this.id = activatedRouter?.snapshot?.paramMap?.get('id');
    // this.courseDetail = dashboardService
    //   .getBlog()
    //   .filter((x) => x?.Id === +this.id)[0];
  }

  

}

import { Component, ViewEncapsulation } from '@angular/core';
import { chemists } from '../healthcare.apis';
import { DataTransferService } from '../../../services/data-transfer.service';
import { CityService } from '../../../services/city-data.service';
import { FormService } from '../../../services/form.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Approve } from '../../../shared/action.model';

@Component({
    selector: 'app-doctor-sidebar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css']
})

export class DoctorComponent {
    doctor_id;
    constructor(
        private route: ActivatedRoute,
        private router: Router
      ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
        this.doctor_id = params['id'];
            console.log(this.doctor_id);
          });
      }
      }


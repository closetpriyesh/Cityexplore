import { Component, ViewEncapsulation } from '@angular/core';
import { chemists } from '../healthcare.apis';
import { DataTransferService } from '../../../services/data-transfer.service';
import { CityService } from '../../../services/city-data.service';
import { FormService } from '../../../services/form.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Approve } from '../../../shared/action.model';

@Component({
    selector: 'app-hospital-sidebar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './hospital.component.html',
    styleUrls: ['./hospital.component.css','../healthcare.css']
})

export class HospitalComponent {
    hospital_id;
    constructor(private route:ActivatedRoute){}

    ngOnInit(){
    this.route.params.subscribe((params: Params) => {
        this.hospital_id = params['id'];
            console.log(this.hospital_id);
          });
        }

}


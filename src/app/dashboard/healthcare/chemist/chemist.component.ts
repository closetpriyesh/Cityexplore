import { Component, ViewEncapsulation } from '@angular/core';
import { chemists } from '../healthcare.apis';
import { DataTransferService } from '../../../services/data-transfer.service';
import { CityService } from '../../../services/city-data.service';
import { FormService } from '../../../services/form.service';
import { Approve } from '../../../shared/action.model';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-chemist-sidebar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './chemist.component.html',
    styleUrls: ['./chemist.component.css','../healthcare.css']
})

export class ChemistComponent {
chemist_id;
constructor(private route:ActivatedRoute){}

ngOnInit()
{
this.route.params.subscribe((params: Params ) => {
    this.chemist_id=params['id'];

});
}
}

import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-lab-sidebar',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './lab.component.html',
    styleUrls: ['./lab.component.css','../healthcare.css']
})

export class LabComponent {

constructor(private route:ActivatedRoute){}
lab_id;
ngOnInit()
{
this.route.params.subscribe((params:Params)=>
{
this.lab_id=params['id'];
});
}
}

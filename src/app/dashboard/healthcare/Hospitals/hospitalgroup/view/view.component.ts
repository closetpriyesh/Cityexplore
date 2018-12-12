import { Component } from "@angular/core";
import { hospitals } from "../../../healthcare.apis";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { Approve } from "../../../../../shared/action.model";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";



@Component({
    selector: 'app-hospitalgroup-view',
    templateUrl: './view.component.html',
    styleUrls: ['../../../secondaryview.css']
  
})

export class ViewHospitalGroupComponent{
    hospital_group;
    data;
    hospital_id;
    formName=hospitals.getHospitalGroup;

    constructor(private route:ActivatedRoute,private router:Router,private dataTransfer:DataTransferService){}
    ngOnInit():void
    {

    this.route.params.subscribe(
        (params:ParamMap)=>
        {
            this.hospital_id=params['id'];
        }
    )

    this.dataTransfer.get(this.formName).
    subscribe(
        (data:any[])=>
    {
this.hospital_group=data;
this.hospital_group=this.hospital_group.hospital_group_list;
console.log(this.hospital_group);
    })

    }

    edit(num:number) {
        this.router.navigate(['/addhospitalgroup',num]);
    }

    delete(num: number) {
        this.dataTransfer.del(hospitals.deleteHospitalGroup, num)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    app(num: number) {
        this.data = new Approve(num, 'Approved');
        this.dataTransfer.push(hospitals.moderateHospitalGroup, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }

    dis(num: number) {
        this.data = new Approve(num, 'Rejected');
        this.dataTransfer.push(hospitals.moderateHospitalGroup, this.data)
        .subscribe((Response)=>
        {
            this.ngOnInit();
        });
    }




}
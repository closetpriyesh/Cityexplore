import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { hospitals } from "../../../healthcare.apis";
import { ActivatedRoute, ParamMap } from "@angular/router";




@Component({
    selector:'app-hospitalgroup-view',
    templateUrl:'./add-update.component.html',
    styleUrls:['../../../healthcare.css']
})


export class AddUpdateHospitalGroupComponent implements OnInit{
    hospital_groupid;
    hospital_group

    hospitalGroupForm:FormGroup;
    constructor(private route:ActivatedRoute,private dataTransfer:DataTransferService,private fb:FormBuilder){}

ngOnInit():void{

    this.route.params.subscribe(
        (params:ParamMap)=>
        {
            this.hospital_groupid=params['id'];
        }
    )
    this.hospitalGroupForm=new FormGroup({
        name: new FormControl('', Validators.required),
    })



    if(this.hospital_groupid)
    {
        let formName=hospitals.getHospitalGroupById;
        this.dataTransfer.get(formName+this.hospital_groupid)
 .subscribe(
     (data: any[]) => {
         this.hospital_group= data, console.log(this.hospital_group);    
         this.hospitalGroupForm.controls['name'].setValue(this.hospital_group.name);          
    
        
 })


    this.hospitalGroupForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
})
    }
}


onSubmit()
{
    let formName=hospitals.addOrUpdateHospitalGroup;
    console.log(this.hospitalGroupForm.value);

    this.dataTransfer.push(formName,this.hospitalGroupForm.value).subscribe();
}
Reset(){
    this.ngOnInit();
}
}

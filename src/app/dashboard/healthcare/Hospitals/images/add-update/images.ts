import { Component, ViewEncapsulation } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { Response } from "@angular/http";
import { Params, ActivatedRoute } from "@angular/router";
import { hospitals } from "../../../healthcare.apis";
import { DataTransferService } from "../../../../../services/data-transfer.service";
import { CityService } from "../../../../../services/city-data.service";


@Component({
    selector: 'app-hospital-images',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './images.html',
    styleUrls:['./images.css']
})

export class AddHospitalImages {
    formName =hospitals.addOrUpdateimages;
    image_url='';
    file: any;
    gg: any;
    city = '';
    files = [];
    types;
    actual;
    image_list;
    url;
    img;
    hospital_id;
    imageForm:FormGroup;
    result: object;
    city_id;
    description:'';
    approval_status;
    image_id;
    page_count;
    latitude;
    longitude;

    constructor(private route:ActivatedRoute,private dataTransfer: DataTransferService,private data:CityService,private fb:FormBuilder) {}
   
    ngOnInit():void {

        this.initForm();
        this.getCity();
        this.route.params.subscribe((params: Params) => {
            this.hospital_id = params['id'];
            this.image_id=params['id2'];
                console.log(this.hospital_id);
              });

              if(this.image_id)
              {
                  let image;
                this.dataTransfer.get("http://uat2-healthcare.cityexploro.com/dashboard/healthcare/hospital/getHospitalImage?hospital_id="+this.hospital_id+"&id="+this.image_id)
                .subscribe(
                    (data: any[]) => {
                        image=data;
                this.imageForm.controls['description'].setValue(image.description);
              
                    });

              }
        this.imageForm.value.city= this.city;
        this.imageForm.value.city_id=this.city_id;
        this.imageForm = this.fb.group({
            image_url:['',[Validators.required]],  
            description:[''],


        });
        this.onChanges();
       
    }


        getCity() {
            
            this.data.currentMessage.subscribe(message => this.city = message);
            this.data.currentNumber.subscribe(message => this.city_id = message);
        }

    initForm():void {
        
        
        this.imageForm= new FormGroup({
            image_url: new FormControl('',Validators.required),
            description:new FormControl(''),
       

        })
    }


    fileEvent(fileInput: any) {
       
        this.files = (<any>event).target.files;
        const file = this.files[0];
        this.file = file;
       
     
    }

    FinalUpload(file:any)
    {
        this.dataTransfer.uploadFile(file.name, file.type)
        .subscribe(
            (response: Response) => {console.log(response.json()),
                this.gg = response.json(),
                console.log(this.gg.data),
                console.log(this.gg.url);
             
                this.img= this.gg.url;
                this.dataTransfer.upload(file, this.gg.data, this.gg.url)
                    .then(
                        (data) => {console.log(data);
                            this.finalSubmit();
                        },
                  
                        (error) => console.log(error)
                    );
            });
    }
  Reset() {
      this.imageForm.reset();
  }

     

finalSubmit()
{
    this.actual={};
    this.actual.hospital_id=this.hospital_id;
    this.actual.image_url=this.img;
      this.actual.description=this.imageForm.value.description;

      console.log(this.actual);
    this.dataTransfer.push(this.formName, this.actual)
        .subscribe();
}

  onSubmit() {
      this.FinalUpload(this.file);
      
  }



  onChanges(): void {
      const phoneControl = this.imageForm.get('phone');
     
  }

    edit(specialization) {
      document.getElementById('newspecialization').focus();

    }


 rejectAdded() {
      this.approval_status = 'rejected';
    }

     approveAdded() {
      this.approval_status = 'approved';
    }
  

}
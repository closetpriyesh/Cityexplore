import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { doctors, hospitals } from '../dashboard/healthcare/healthcare.apis';
import { DataTransferService } from './data-transfer.service';
import { CityService } from './city-data.service';
import { Doctor } from '../dashboard/models/doctor';

export class DOCTOR {
  constructor(public approval_status: string, public awards: string,public id:number,public image_url:string,public is_deleted:string,public name:string,public total_exp:number) { }
}

let  doc: Array<DOCTOR> = [];

@Injectable()
export class DoctorService {
constructor(private dataTransfer:DataTransferService,private city:CityService){}

getdoctors(doctor:Array<DOCTOR>) {
  doc=doctor;
}
go()
{
  return of(doc);
}


  getdoctor(id: number | string) {

    return this.go().pipe(
      // (+) before `id` turns the string into a number
      map(doctors => doctors.find(DOCTOR => DOCTOR.id === +id))
    );
  }
}

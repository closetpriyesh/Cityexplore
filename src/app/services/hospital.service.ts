import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { DataTransferService } from './data-transfer.service';
import { CityService } from './city-data.service';

export class HOSPITAL {
  constructor(public approval_status: string, public city_id: number,public created_by:string,public id:number,public is_deleted:string,public name:string,public phone_nums:any,public type:number,public website:string) { }
}

let  hos: Array<HOSPITAL> = [];

@Injectable()
export class HospitalService {
constructor(private dataTransfer:DataTransferService,private city:CityService){}

gethospitals(hospital:Array<HOSPITAL>) {
  hos=hospital;
}
go()
{
  return of(hos);
}


  gethospital(id: number | string) {

    return this.go().pipe(
      // (+) before `id` turns the string into a number
      map(hospitals => hospitals.find(hospital => hospital.id === +id))
    );
  }
}

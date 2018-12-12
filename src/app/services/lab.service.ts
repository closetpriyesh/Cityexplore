import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { DataTransferService } from './data-transfer.service';
import { CityService } from './city-data.service';

export class LAB {
  constructor(public approval_status: string, public city_id: number,public email:string,public id:number,public image_url,public is_deleted:string,public name:string,public phone:any) { }
}

let  l: Array<LAB> = [];

@Injectable()
export class LabService {
constructor(private dataTransfer:DataTransferService,private city:CityService){}

getlabs(lab:Array<LAB>) {
    l=lab;
}
go()
{
  return of(l);
}


  getlab(id: number | string) {

    return this.go().pipe(
      // (+) before `id` turns the string into a number
      map(labs => labs.find(lab => lab.id === +id))
    );
  }
}

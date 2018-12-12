import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { DataTransferService } from './data-transfer.service';
import { CityService } from './city-data.service';


export class CHEMIST {
  constructor(public approval_status: string, public city_id: number,public email:string,public id:number,public image_url:string,public is_deleted:string,public name:string,public phone:any) { }
}

let  chem: Array<CHEMIST> = [];

@Injectable()
export class ChemistService {
constructor(private dataTransfer:DataTransferService,private city:CityService){}

getchemists(chemist:Array<CHEMIST>) {
  chem=chemist;
}
go()
{
  return of(chem);
}


  getchemist(id: number | string) {

    return this.go().pipe(
      // (+) before `id` turns the string into a number
      map(chemists => chemists.find(chemist => chemist.id === +id))
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FormService {

    private AddOrEdit = new BehaviorSubject<string>('Add');
    private val = new BehaviorSubject<object>({});
    currentForm = this.AddOrEdit.asObservable();
    currentVal = this.val.asObservable();

    constructor() {}

    AddOrEditForm(message: string) {
        this.AddOrEdit.next(message);
    }

    Value(obj: any) {
        this.val.next(obj);
    }
}

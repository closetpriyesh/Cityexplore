import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Promise } from 'q';
import { Deferred} from './defer.promise';
import { environment } from '../../environments/environment';
import { doctors } from '../dashboard/healthcare/healthcare.apis';

@Injectable()


export class DataTransferService {

    googleGeocodeApi = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    constructor(private http: Http) {}

    get(formName: string) {
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'abcd'});
        console.log(formName);
        return this.http.get(formName, {headers: headers})
            .map(
                (response: Response) => {
                    const data = response.json();
                    console.log(response);
                    return data;
                }
            );
    }

    push(formName: string, user: any) {
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'abcd'});
        return this.http.post(formName, JSON.stringify(user), {headers: headers})
            .map(
                (response) => console.log(response),
                (error) => console.log(error)
            );
    }

   

   


    del(formName: string, id: number) {
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'abcd'});
        return this.http.delete(formName + '/' + id, {headers: headers})
            .map(
                (response) => console.log(response),
                (error) => console.log(error)
            );
    }

    uploadFile(name: string, type: string) {
        return this.http.get(environment.baseDataEntryUrl + 'dashboard/media/presign?file_name=' + name + '&file_type=' + type);

    }

    upload(file, s3Data, url) {
        var promise= new Deferred<boolean>();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', s3Data.url);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

        var postData = new FormData();
        for (var key in s3Data.fields) {
          postData.append(key, s3Data.fields[key]);
        }
        postData.append('file', file);

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 204 || xhr.status === 201) {
              // document.getElementById('preview').src = url;
              // document.getElementById('image-url').value = url;
              promise.resolve(true);
              console.log('success');

            } else {
              // alert('Could not upload file.' + xhr.error);
              promise.reject(false);
              console.log('Error');
            }
          }
        };
        xhr.send(postData);
        return promise.promise;
      }

    getlatlng(address) {
        return this.http.get(this.googleGeocodeApi + address)
            .map(
                (response: Response) => { console.log(response); const data = response.json(); return data.results[0].geometry.location; },
                (error) => console.log(error)
            );
      }

     

    
}

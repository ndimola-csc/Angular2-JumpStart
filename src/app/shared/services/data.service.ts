import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';

//Grab everything with import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService {
  
    baseUrl: string = 'http://localhost:8080/api';

    constructor(private http: Http) { }
    
    getMembers() {
        return this.http.get(this.baseUrl + "/members")
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    getClaims(memberId: int){
      return this.http.get(this.baseUrl + '/members/' + memberId + '/claims')
                      .map((res: Response) => res.json())
                      .catch(this.handleError);               
    }
    
    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormResponses } from './shared/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CMSService {
  private baseapiUrl: string = "https://localhost:7250";
  private baseUrl: string = "https://localhost:7250/api/Users"

  constructor(private http: HttpClient) { }


  onlogin(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj)
  }
  onsignup(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  getUsers(){
    return this.http.get(this.baseUrl);
    }
    deleteUsers(id:number){
      return this.http.delete("https://localhost:7250/api/Users/"+id);
    }

    getallqueries():Observable<FormResponses[]> {
      return this.http.get<FormResponses[]>(this.baseapiUrl+ '/api/formresponses');
    }

    addQuery(form: FormResponses):Observable<FormResponses>{
      return this.http.post<FormResponses>(this.baseapiUrl+ '/api/formresponses',form);
    }

    deletequery(id:number):Observable<FormResponses[]> { 
      return this.http.delete<FormResponses[]>(this.baseapiUrl+ '/api/formresponses/'+ id);
    }
    
}


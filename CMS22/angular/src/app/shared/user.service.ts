import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Users, Job } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'user';
  private userSubject = new Subject<any>();
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  constructor(private httpClient: HttpClient) { }

  usersUrl: string = 'https://localhost:7250/api/Users';
  jobsUrl: string = 'https://localhost:7250/api/Job';

  userList: Users[] = [];
  jobList: Job[] = [];
  userData: Users = new Users();

  saveUser(): Observable<any> {
    return this.httpClient.post(this.usersUrl, this.userData);
  }

  updateUser(): Observable<any> {
    return this.httpClient.put(`${this.usersUrl}/${this.userData.UserID}`, this.userData);
  }
  
  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.usersUrl);
  }

  getJobs(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.jobsUrl);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.usersUrl}/${id}`);
  }

  authenticateUser(username: string, password: string): Observable<any> {
  const authUrl = 'https://localhost:7250/api/Users/authenticate';
  const credentials = { username, password };

  return this.httpClient.post(authUrl, credentials)
    

}
GetUserByUsername(Username:string){
  return this.httpClient.get<Users>('https://localhost:7250/api/user/'+Username);
 }
 updateUserbyid(userData: Users): Observable<any> {

  return this.httpClient.put(`${this.usersUrl}/${userData.UserID}`, userData);

}
getUserById(id: number): Observable<Users> {

  const url = `${this.usersUrl}/users/${id}`;

  return this.httpClient.get<Users>(url);

}

getcat(){
  return this.httpClient.get<any>('https://localhost:7250/api/Categories');
}

}
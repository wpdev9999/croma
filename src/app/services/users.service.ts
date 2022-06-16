import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL = "http://localhost:3000";
  

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  constructor(private http: HttpClient) {console.log(this.apiURL); }

  getAll(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiURL + '/users/').pipe(map(res => res));
  }

  addUser(data: Users): Observable<Users[]>{
    return this.http.post<Users[]>(this.apiURL + '/users', {...data}).pipe(map(res => res));
  }

  putUser(data: Users, id: number): Observable<Users[]>{
    return this.http.put<Users[]>(this.apiURL + '/users/'+id, {...data}).pipe(map(res => res));
  }
  
  deleteUser(id: number): Observable<Users[]>{
    return this.http.delete<Users[]>(this.apiURL + '/users/'+id).pipe(map(res => res));
  }

  checkUser(username: string, password: string): Observable<any>{
    return this.http.get<any>(this.apiURL + '/login?username='+username+'&password='+password).pipe(map(res => res));
  }

  checkLogin(){
    if(localStorage.getItem('user')){
      return true
    }
    return false   
  }

}

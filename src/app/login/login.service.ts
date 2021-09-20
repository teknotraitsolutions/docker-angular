import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  //service for login 
  getToken(email: any,password: any)
  {
    let Object =
    {
      email:email,
      password:password
    }
    return this.http.post("/user/login",Object)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUserDto } from '../DTOs/account/RegisterUserDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginUserResponse } from '../DTOs/account/loginUserResponse';
import { LoginUserDto } from '../DTOs/account/loginUserDto';
import { CurrentUser } from '../DTOs/account/currentUser';
import { CheckAuthUserResult } from '../DTOs/account/checkAuthUserResult';
import { EditFormData } from '../DTOs/EditUser/editFormData';
import { EditFormResponse } from '../DTOs/EditUser/editFormRes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null as any);
  public loggedIn = false;
  constructor(public http: HttpClient) {

  }
  registerUser(registerData: RegisterUserDto): Observable<any> {
    return this.http.post<any>("/account/register-user", registerData);
  }
  loginUser(loginData: LoginUserDto): Observable<loginUserResponse> {
    return this.http.post<loginUserResponse>("/account/login-user", loginData);
  }
  getCurrentUser() {
    return this.currentUser;
  }
  setCurrentUser(user: CurrentUser) {
    this.currentUser.next(user);
    if (this.currentUser == null)
      this.loggedIn = false;
    else
      this.loggedIn = true;
  }
  checkAuthUser(): Observable<CheckAuthUserResult> {
    return this.http.get<CheckAuthUserResult>("/account/check-auth-user");
  }
  logout(): Observable<any> {
    return this.http.get<any>("/account/logout-user");
  }
  activateAccount(id: string | null): Observable<any> {
    return this.http.get<any>("/account/activate-account/" + id);
  }
  /*createPromiseForLoggedIn*/
  isAuthenticated() {
    let promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return promise;
  };

  /*editProdile*/
  editUser(editData: EditFormData):Observable<EditFormResponse> {
   return this.http.post<EditFormResponse>('/account/edit-user',editData);
  }
}

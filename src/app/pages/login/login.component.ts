import { CommonModule } from '@angular/common';
import { LoginUserDto } from './../../DTOs/account/loginUserDto';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUser } from '../../DTOs/account/currentUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = null as any;
  loginDataDto: LoginUserDto = null as any;
  currentUser:CurrentUser=null as any;
  constructor(public cookieService:CookieService,public authService: AuthService,public router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.maxLength(100),Validators.email]),

      password: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    })
  }

  submitLoginForm() {
    this.loginDataDto = new LoginUserDto(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value,
    );


    this.authService.loginUser(this.loginDataDto).subscribe(res => {
      console.log(res.status)
      console.log(res.data);
      this.cookieService.set("AngularEShop",res.data.token);
this.currentUser=new CurrentUser(res.data.id,res.data.firstName,res.data.lastName,res.data.email,res.data.address)
      this.authService.setCurrentUser(this.currentUser);
       this.authService.currentUser.subscribe(res=>console.log(res));
       console.log(res.data.token)
       this.router.navigate(["/"])
    });

  }
}

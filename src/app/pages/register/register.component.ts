import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUserDto } from '../../DTOs/account/RegisterUserDto';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule, SweetAlert2Module],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('sweet') swal:any
  registerForm: FormGroup = null as any;
  registerData: RegisterUserDto = null as any;
  constructor(public authService: AuthService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.email]),

      password: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      address: new FormControl(null, [Validators.required, Validators.maxLength(200)])
    });
  }
  submitRegisterForm() {
    
    this.registerData = new RegisterUserDto(
      this.registerForm.controls['firstName'].value,
      this.registerForm.controls['lastName'].value,
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value,
      this.registerForm.controls['confirmPassword'].value,
      this.registerForm.controls['address'].value
    );
   this.authService.registerUser(this.registerData).subscribe(res => {
      console.log(res);
      
   this.swal.fire();
    })
  }
}

import { AuthService } from './../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CurrentUser } from '../../../DTOs/account/currentUser';
import { EditFormData } from '../../../DTOs/EditUser/editFormData';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';
import { UserSidebarComponent } from '../../../sharedComponent/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,RouterLink,UserSidebarComponent],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent {
  currentUser: CurrentUser = null as any;
  editForm: FormGroup = null as any;
  editFormData: EditFormData = null as any;
  constructor(public authService: AuthService, public cookieService: CookieService,public router:Router) { }
  ngOnInit() {


    /*InitializeCurrentUser*/
    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;

    });

    /*initializeEditForm*/
    this.editForm = new FormGroup(
      {
        firstName: new FormControl(this.currentUser.firstName, [Validators.required]),
        lastName: new FormControl(this.currentUser.lastName, [Validators.required]),
        email: new FormControl(this.currentUser.email, [Validators.required, Validators.email]),
        address: new FormControl(this.currentUser.address, [Validators.required])

      }
    );
  }

  /* SentEditFormData*/
  send() {
    this.editFormData = new EditFormData(
      this.editForm.controls['firstName'].value,
      this.editForm.controls['lastName'].value,
      this.editForm.controls['email'].value,
      this.editForm.controls['address'].value,
    );
    this.authService.editUser(this.editFormData).subscribe(res => {
      console.log(res.data);
      this.authService.checkAuthUser().subscribe(res => {
        this.authService.setCurrentUser(res.data);
        this.authService.getCurrentUser().subscribe(re => {
          this.currentUser = res.data;
        })
      })
    })
  }






}

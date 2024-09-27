import { Component,Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {






  constructor(public authService: AuthService,public activatedRoute:ActivatedRoute) { }
  ngOnInit() {
this.authService.activateAccount("d655d5aa-4b7e-4c30-98d4-c953e14ea1ef").subscribe(res=>console.log(res))

    
    
   
  }
}

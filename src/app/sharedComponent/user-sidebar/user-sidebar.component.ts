import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [RouterLink,RouterModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  constructor(public authService:AuthService,public cookieService:CookieService,public router:Router){}
  /*logOut*/
  logout() {
    this.authService.logout().subscribe(res => {
      this.authService.setCurrentUser(null as any);
      this.cookieService.delete("AngularEShop");
      this.router.navigate(['login']);
    });
  }
}

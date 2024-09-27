import { ProductService } from './../../services/product.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AboutUsComponent } from '../../pages/about-us/about-us.component';
import { ContactUsComponent } from '../../pages/contact-us/contact-us.component';
import { CurrentUser } from '../../DTOs/account/currentUser';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CartComponent } from '../../pages/cart/cart.component';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AboutUsComponent, ContactUsComponent, CommonModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: CurrentUser = null as any;

  constructor(public authService: AuthService, public cookieService: CookieService, public router: Router, public cartService: CartService) { }
  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user
    });

  }
  /*logOut*/
  logout() {
    this.authService.logout().subscribe(res => {

      if (res.status == "Success") {
        this.authService.setCurrentUser(null as any);
        this.cookieService.delete("AngularEShop");
        this.router.navigate(["/"]);
      }
    })
  }

}

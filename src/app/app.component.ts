import { LoginComponent } from './pages/login/login.component';
import { CheckAuthUserDto } from './DTOs/account/checkAuthUserResult';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './sharedComponent/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './sharedComponent/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CurrentUser } from './DTOs/account/currentUser';
import { RegisterComponent } from './pages/register/register.component';
import { CartService } from './services/cart.service';
import { GetItemCart } from './DTOs/cart/getItemCart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, FooterComponent, LoginComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentUser: CurrentUser = null as any;
  constructor(public authService: AuthService, public router: Router, public cartService: CartService) { }
  ngOnInit() {
    this.authService.checkAuthUser().subscribe(res => {
      if (res.status == "Success") {
        this.currentUser = new CurrentUser(
          res.data.id,
          res.data.firstName,
          res.data.lastName,
          res.data.email,
          res.data.address
        )
        this.authService.setCurrentUser(this.currentUser)
      }
      else if (res.status == "Error") {
        console.log("باید وارد سایت شوید")

      }

    })

        /* fetchCartItemsFromServer*/
        this.cartService.getItemsCart().subscribe(res => {
          this.cartService.setCurrentCart(res.data)
        })

  }
}

import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { UserAuthGuard } from './utilities/userAuthGuard';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { EditCartComponent } from './pages/account/edit-cart/edit-cart.component';
import { UserSidebarComponent } from './sharedComponent/user-sidebar/user-sidebar.component';


export const routes: Routes = [
    
    {path:'',component:HomeComponent},
    {path:'about-us',component:AboutUsComponent},
    {path:'contact-us/:id',component:ContactUsComponent,canActivate:[UserAuthGuard]},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'activate-account',component:ActivateAccountComponent},
    {path:'product',component:ProductComponent},
    {path:'product-details/:id',component:ProductDetailsComponent},
    {path:'user/edit',component:EditAccountComponent},
    {path:'user/edit-cart',component:EditCartComponent},
    {path:'user/sidebar',component:UserSidebarComponent},
    {path:'**',component:PageNotFoundComponent},
]

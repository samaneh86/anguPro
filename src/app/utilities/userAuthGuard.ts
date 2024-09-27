import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

export class UserAuthGuard implements CanActivate {
    constructor(public authService: AuthService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean|UrlTree|Observable<boolean|UrlTree>|Promise<boolean|UrlTree> {
       return this.authService.isAuthenticated().then(res => {
            if (res)
                return true;
            else
                this.router.navigate(['login']);
            return false;
        })
    }
}
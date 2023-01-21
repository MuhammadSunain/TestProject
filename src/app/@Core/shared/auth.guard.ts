import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router  } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private authSer: AuthService,
        private route: Router
    ) {}

    canActivate() {
        if(this.authSer.IsLoggedIn()) {
            return true;
        }
        this.route.navigate(['/authentication/login']);
        return false;
    }
}
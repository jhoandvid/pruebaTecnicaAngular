import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/modules/services/localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard  {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user=localStorage.getItem('user');
        console.log(user)
        if (!user) {
            this.router.navigate(['/', 'auth']);
            return false;
        }
        return true;
  }


}

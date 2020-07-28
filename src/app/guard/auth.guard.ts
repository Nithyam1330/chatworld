import { LOCAL_STORAGE_ENUMS } from './../shared/constants/localstorage.enums';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem(LOCAL_STORAGE_ENUMS.loggedInID);
    if (!user) {
      this.router.navigate(['/login'], { skipLocationChange: true });
    }

    return true;

  }

}

import { LOCAL_STORAGE_ENUMS } from './../shared/constants/localstorage.enums';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReAuthGuard implements CanActivate {
  constructor(private router: Router, private api: ApiService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem(LOCAL_STORAGE_ENUMS.loggedInID);
    if (user) {
      this.router.navigate(['home']);
    }
    return true;

  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReAuthGuard implements CanActivate {
  constructor(private router: Router, private api: ApiService) { }
  // example use of guard
  //  { path: 'special', component: SpecialPage, canActivate: [AuthGuard] },

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem('loggedIn');
    if (user) {
      this.router.navigate(['home']);
    }
    return true;

  }
}

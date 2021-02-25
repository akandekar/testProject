import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private _router: Router) { }
  canActivate(): boolean {
    if (!!sessionStorage.getItem('user')) {
      return true;
    }
    else {
      alert("Access denied");
      // this._router.navigate(['/login']);
      this._router.navigate(['/']);
      return false;
    }
  }

}

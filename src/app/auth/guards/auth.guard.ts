import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService, public router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer) => {
            this.authService.isAuthenticated().subscribe({
                next: (isAuthenticated) => {
                    if (isAuthenticated) {
                        observer.next(true);
                    } else {
                        this.router.navigate(['auth/login']);
                        observer.next(false);
                    }
                },
                error: (e)  => {
                    observer.next(false);
                }
            });
        });
    }

}

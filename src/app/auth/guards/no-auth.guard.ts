import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

    constructor(public authService: AuthService, public router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable((observer) => {
            this.authService.isAuthenticated().subscribe({
                next: (isAuthenticated) => {
                    if (isAuthenticated) {
                        this.router.navigate(['pages/home']);
                        observer.next(false);
                    } else {
                        observer.next(true);
                    }
                },
                error: (e)  => {
                    observer.next(false);
                }
            });
        });
    }

}

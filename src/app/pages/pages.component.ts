import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterModule,
    ]
})
export class PagesComponent {

    constructor(
        private _authService: AuthService,
        private _router: Router,
    ) {
    }

    logout(): void {
        this._authService.logout();
        this._router.navigate(['auth/login']);
    }

}

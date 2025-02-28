import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ]
})
export class LoginComponent {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(16)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    });

    loginLoading: boolean = false;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {

    }

    login(): void {
        this.loginLoading = true;
        this._authService.login(this.loginForm.controls.username.value as string, this.loginForm.controls.password.value as string).subscribe({
            next: () => {
                this.loginLoading = false;
                this._router.navigate(['pages/home']);
            },
            error: (e) => {
                this.loginLoading = false;
            },
        });
    }

}

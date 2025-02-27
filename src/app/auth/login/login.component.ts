import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [NgIf, MatIcon, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatButton, MatProgressSpinner]
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

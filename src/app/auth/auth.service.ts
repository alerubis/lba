import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { environment } from '../../environments/environment';
import { ErrorDialogComponent } from '../shared/dialogs/error-dialog/error-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private _isAuthenticated: boolean = false;
    private _token: string = '';
    private _user: any = null;

    constructor(
        private _httpClient: HttpClient,
        private _matDialog: MatDialog,
    ) {
    }

    //#region Auth
    login(username: string, password: string): Observable<boolean> {
        return new Observable((observer) => {
            this.wsCall('auth/login', { username: username, password: password }).subscribe({
                next: data => {
                    this._isAuthenticated = true;
                    this._token = data.token;
                    this._user = data.user;
                    localStorage.setItem('token', data.token);
                    observer.next(true);
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

    logout(): void {
        this._token = '';
        this._isAuthenticated = false;
        localStorage.removeItem('token');
    }

    isAuthenticated(): Observable<boolean> {
        return new Observable((observer) => {
            if (this._isAuthenticated) {
                observer.next(true);
                observer.complete();
            } else {
                this._token = localStorage.getItem('token') || '';
                if (this._token) {
                    this.wsCall('auth/get-user-from-token', null).subscribe({
                        next: data => {
                            this._isAuthenticated = true;
                            this._user = data;
                            observer.next(true);
                            observer.complete();
                        },
                        error: error => {
                            observer.next(false);
                            observer.complete();
                        }
                    });
                } else {
                    observer.next(false);
                    observer.complete();
                }
            }
        });
    }
    //#endregion

    //#region Utils
    getUser(): any {
        return this._user;
    }

    wsCall(url: string, body?: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this._token,
            })
        };
        return new Observable((observer) => {
            this._httpClient.post<any>(environment.wsUrl + url, body, httpOptions).subscribe({
                next: response => {
                    if (!response || !response.status || response.status === 'error' || response.status === 'fail') {
                        this.handleError(response, observer);
                    } else {
                        observer.next(response.data);
                        observer.complete();
                    }
                },
                error: error => {
                    this.handleError(error, observer);
                }
            });
        });
    }

    handleError(error: any, observer: Subscriber<any>) {
        console.error(error);
        const betterErrorMessage = error?.error?.message || error?.message || error;
        const dialogRef = this._matDialog.open(ErrorDialogComponent, {
            width: '100%',
            maxWidth: '1024px',
            data: {
                message: betterErrorMessage,
                error: error,
            },
        });
        observer.error(error);
    }
    //#endregion

}

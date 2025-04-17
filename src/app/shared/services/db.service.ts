import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Table } from '../types/db/Table';

@Injectable({
    providedIn: 'root',
})
export class DbService {

    constructor(private _authService: AuthService) {
    }

    callCustomRoute<T>(url: string, payload: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this._authService.wsCall('db/' + url + '/lineup', payload).subscribe({
                next: response => resolve(response),
                error: error => resolve([] as any)
            });
        });
    }
    callCustomLineupRoute<T>(url: string, payload: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this._authService.wsCall('db/' + url + '/lineup-by-minute', payload).subscribe({
                next: response => resolve(response),
                error: error => resolve([] as any)
            });
        });
    }    

    readList(table: Table, where?: any): Promise<Table[]> {
        return new Promise((resolve, reject) => {
            this._authService.wsCall('db/' + table.getName() + '/read', {
                skip: 0,
                take: 1000000,
                where: where,
                orderBy: undefined,
            }).subscribe({
                next: response => {
                    const rows = response.rows.map((x: any) => table.fromDbValues(x));
                    resolve(rows);
                },
                error: error => {
                    resolve([]);
                }
            });
        });
    }

    readListPaginate(table: Table, where: any, paginator?: MatPaginator, sort?: MatSort): Observable<{ rows: Table[], count: number }> {
        return new Observable((observer) => {
            this._authService.wsCall('db/' + table.getName() + '/read', {
                skip: (paginator?.pageIndex || 0) * (paginator?.pageSize || 10),
                take: (paginator?.pageSize || 10),
                where: where,
                orderBy: (sort?.active && sort.direction ? { [sort.active]: sort.direction } : undefined),
            }).subscribe({
                next: response => {
                    observer.next({
                        rows: response.rows.map((x: any) => table.fromDbValues(x)),
                        count: response.count,
                    });
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

    readUnique(table: Table, where: any): Promise<Table | null> {
        return new Promise((resolve, reject) => {
            this._authService.wsCall('db/' + table.getName() + '/read', { take: 1, where: where }).subscribe({
                next: response => {
                    if (response.rows.length > 0) {
                        resolve(table.fromDbValues(response.rows[0]));
                    } else {
                        resolve(null);
                    }
                },
                error: error => {
                    resolve(null);
                }
            });
        });
    }

    create(entity: Table): Observable<any> {
        return new Observable((observer) => {
            this._authService.wsCall('db/' + entity.getName() + '/create', entity.toDbValues()).subscribe({
                next: response => {
                    observer.next(entity.fromDbValues(response));
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

    update(entity: Table, params?: any): Observable<any> {
        return new Observable((observer) => {
            const body = {
                ...params,
                ...entity.toDbValues()
            };
            this._authService.wsCall('db/' + entity.getName() + '/update', body).subscribe({
                next: response => {
                    observer.next(entity.fromDbValues(response));
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

    delete(entity: Table): Observable<any> {
        return new Observable((observer) => {
            this._authService.wsCall('db/' + entity.getName() + '/delete', entity.toDbValues()).subscribe({
                next: response => {
                    observer.next(response);
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

}

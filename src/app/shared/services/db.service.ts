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

    readList(table: Table, where?: any, paginator?: MatPaginator, sort?: MatSort): Promise<Table[]> {
        return new Promise((resolve, reject) => {
            this._authService.wsCall('db/' + table.getName() + '/read', {
                skip: (paginator?.pageIndex || 0) * (paginator?.pageSize || 25),
                take: (paginator?.pageSize || 25),
                where: where,
                orderBy: (sort?.active && sort.direction ? { [sort.active]: sort.direction } : undefined),
            }).subscribe({
                next: response => {
                    const rows = response.rows.map((x: any) => table.fromDbValues(x));
                    const count = response.count;
                    resolve(rows);
                },
                error: error => {
                    resolve([]);
                }
            });
        });
    }

    readFromId(table: Table, id: number): Promise<Table | null> {
        return new Promise((resolve, reject) => {
            this._authService.wsCall('db/' + table.getName() + '/read', { take: 1, where: { id: id } }).subscribe({
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
                    observer.next(response);
                    observer.complete();
                },
                error: error => {
                    observer.error(error);
                }
            });
        });
    }

    update(entity: Table): Observable<any> {
        return new Observable((observer) => {
            this._authService.wsCall('db/' + entity.getName() + '/update', entity.toDbValues()).subscribe({
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

    delete(entity: Table): Observable<any> {
        return new Observable((observer) => {
            this._authService.wsCall('db/' + entity.getName() + '/delete', { id: entity.id }).subscribe({
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ITodo } from '../models/todo';


@Injectable({ providedIn: 'root' })
export class HomeService {

    private readonly CONTROLLER_NAME = 'todos';  // URL to web api

    constructor(private http: HttpClient) {}

    getTodos(): Observable<ITodo[]> {
        return this.http.get<ITodo[]>(this.CONTROLLER_NAME);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable, forkJoin } from 'rxjs'
import { map } from 'rxjs/operators';
import { ITodo } from '../models/todo';
import { UrlHelperService } from 'src/app/shared/services/url-helper.service';
import { FormGroup } from '@angular/forms';
import { ITodoRequest } from '../models/todo-request';

@Injectable({ providedIn: 'root' })
export class HomeService {

    private readonly CONTROLLER_NAME = 'todos';  // URL to inmemory-web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient, private urlHelperService: UrlHelperService) { }

    getTodos(): Observable<ITodo[]> {
        const url = this.urlHelperService.getUrl(this.CONTROLLER_NAME);
        return this.http.get<ITodo[]>(url).pipe(
            map((res: ITodo[]) => {
                const items = <ITodo[]>res
                // reason I did this workaround way is because angular date pipe in html didn't work as it should
                items.forEach(item => item.dateCreated = moment(item.dateCreated).format('DD.MM.YYYY'));
                return items;
            })
        )
    }


    getTodo(id: number): Observable<ITodo> {
        const url = this.urlHelperService.getUrl(this.CONTROLLER_NAME, id.toString());
        return this.http.get<ITodo>(url);
    }

    addTodo(todoFG: FormGroup): Observable<ITodo> {
        todoFG.patchValue({
            dateCreated: new Date(todoFG.value.dateCreated.year, todoFG.value.dateCreated.month, todoFG.value.dateCreated.day)
        });
        const url = this.urlHelperService.getUrl(this.CONTROLLER_NAME);
        return this.http.post<ITodo>(url, todoFG.value, this.httpOptions);
    }

    updateTodo(todoFG: FormGroup): Observable<ITodo> {

        const request: ITodoRequest = {
            id: todoFG.value.id,
            name: todoFG.value.name,
            title: todoFG.value.title,
            isCompleted: todoFG.value.isCompleted,
            description: todoFG.value.description,
            dateCreated: new Date(todoFG.value.dateCreated.year, todoFG.value.dateCreated.month - 1, todoFG.value.dateCreated.day)
        }

        const url = this.urlHelperService.getUrl(this.CONTROLLER_NAME);
        return this.http.put<ITodo>(url, request, this.httpOptions);
    }

    updateTasks(todos: ITodo[]): Observable<ITodo[]> {
        let allQueries = todos.map(
            todo => {
                todo.dateCreated = new Date(moment(todo.dateCreated, 'DD.MM.YYYY').year(), moment(todo.dateCreated, 'DD.MM.YYYY').month(), moment(todo.dateCreated, 'DD.MM.YYYY').date())
                todo.isCompleted = true;
                const url = this.urlHelperService.getUrl(this.CONTROLLER_NAME);
                return this.http.put<ITodo>(url, todo, this.httpOptions);
            }
        )
        //return a new observable that will emit all the http results
        return forkJoin(allQueries)
    }

    /** DELETE: delete the hero from the server */
    deleteHero(todoId: number): Observable<ITodo> {
        const url = this.urlHelperService.getUrl(this.CONTROLLER_NAME, todoId.toString());

        return this.http.delete<ITodo>(url, this.httpOptions);
    }
}
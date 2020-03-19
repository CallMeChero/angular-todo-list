import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITodo } from '../models/todo';
import { UrlHelperService } from 'src/app/shared/services/url-helper.service';


@Injectable({ providedIn: 'root' })
export class HomeService {

    private readonly CONTROLLER_NAME = 'todos';  // URL to web api

    constructor(private http: HttpClient, private urlHelperService: UrlHelperService) {}

    getTodos(): Observable<ITodo[]> {
        const url = this.urlHelperService.getUrl(this.CONTROLLER_NAME);
        return this.http.get<ITodo[]>(url).pipe(
            map((res: ITodo[]) => {
                const items = <ITodo[]>res
                items.forEach(item => item.dateCreated = moment(item.dateCreated).format('DD.MM.YYYY'));
                return items;
              }
            )
        )
            
    }
}
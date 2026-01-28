import { inject, Injectable } from '@angular/core';
import { URL_API } from '../constants/api.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ParamsTodoRetrieve,
  Todo,
  TodoRequest,
  TodoResponse,
} from '../shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  URL_API_TODO = `${URL_API}/todo`;

  _httpClient = inject(HttpClient);

  getTodos(params: ParamsTodoRetrieve): Observable<TodoResponse> {
    let httpParams = new HttpParams();
    if (params.filter) {
      httpParams = httpParams.set('filter', params.filter);
    }
    if (params.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }
    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit);
    }
    if (params.offset !== undefined) {
      httpParams = httpParams.set('offset', params.offset);
    }
    return this._httpClient.get<TodoResponse>(this.URL_API_TODO, { params: httpParams });
  }

  createTodo(request: TodoRequest): Observable<Todo> {
    return this._httpClient.post<Todo>(this.URL_API_TODO, request);
  }

  updatedTodo(request: TodoRequest, todoId: number): Observable<Todo> {
    return this._httpClient.patch<Todo>(`${this.URL_API_TODO}/${todoId}`, request);
  }

  deleteTodo(todoId: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.URL_API_TODO}/${todoId}`);
  }
}

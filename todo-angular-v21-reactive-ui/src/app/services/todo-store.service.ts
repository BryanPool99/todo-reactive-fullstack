import { inject, Injectable, signal } from '@angular/core';
import { TodoService } from './todo.service';
import { ParamsTodoRetrieve, Todo, TodoRequest, TodoResponse } from '../shared/interfaces/todo.interface';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  _todoService = inject(TodoService);

  readonly todo = signal<Todo[]>([]);
  readonly isLoading = signal(false);

  loadTodos(params: ParamsTodoRetrieve){
    this.isLoading.set(true);
    this._todoService.getTodos(params)
    .pipe(finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: (res: TodoResponse) => this.todo.set(res.data),
      error: (err) => console.log(err),
    })
  }

  //GUARDAR TODO MEDIANTE SIGNALS
  saveTodo(request: TodoRequest, todoId?: number) {
    const operation = todoId
      ? this._todoService.updatedTodo(request, todoId)
      : this._todoService.createTodo(request);

    operation.subscribe({
      next: (res: Todo) => {
        //CASO DE ACTUALIZACION
        if(todoId){
          this.todo.update((todos) => todos.map((todo) => todo.id === todoId ? res : todo));
        }
        //CASO DE CREACION
        else{
          this.todo.update((todos) => [res,...todos]);
        }
      },
      error: (err) => console.log(err),
    })
  }
  //ELIMINAR UN TODO MEDIANTE SIGNALS
  deleteTodo(todoId: number) {
    this.isLoading.set(true);
    this._todoService.deleteTodo(todoId)
    .pipe(finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: () => this.todo.update((todos) => todos.filter((todo) => todo.id !== todoId)),
      error: (err) => console.log(err),
    })
  }
}

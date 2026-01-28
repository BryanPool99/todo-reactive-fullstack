import { inject, Injectable, signal } from '@angular/core';
import { TodoService } from './todo.service';
import { ParamsTodoRetrieve, Todo, TodoRequest } from '../shared/interfaces/todo.interface';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private _todoService = inject(TodoService);
  // Signals de estado
  readonly todos = signal<Todo[]>([]);
  readonly isLoading = signal<boolean>(false);

  loadTodos(params: ParamsTodoRetrieve) {
    this.isLoading.set(true);
    this._todoService
      .getTodos(params)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          if (res.result) {
            this.todos.set(res.data);
          }
        },
        error: (err) => console.error(err),
      });
  }

  // 3. LA ACCIÓN: Este es el método que centraliza la lógica.
  saveTodo(request: TodoRequest, id?: number) {
    // Decidimos si llamar a POST (crear) o PATCH (editar)
    const operation = id
      ? this._todoService.updatedTodo(request, id)
      : this._todoService.createTodo(request);

    // Ejecutamos la petición HTTP
    operation.subscribe({
      next: (resultado) => {
        // AQUÍ ESTÁ EL TRUCO:
        // Una vez que el servidor nos responde que todo salió bien,
        // actualizamos el Signal.

        if (id) {
          // Si editamos, buscamos el que cambió y lo reemplazamos en la lista
          this.todos.update((listaActual) => listaActual.map((t) => (t.id === id ? resultado : t)));
        } else {
          // Si creamos uno nuevo, lo agregamos al principio de la lista
          this.todos.update((listaActual) => [...listaActual, resultado]);
        }
      },
    });
  }

  // Dentro de TodoStore
  deleteTodo(id: number) {
    this.isLoading.set(true);
    this._todoService
      .deleteTodo(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          // Actualizamos el signal filtrando el ID eliminado
          this.todos.update((listaActual) => listaActual.filter((t) => t.id !== id));
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
  }
}

import { Component, inject } from '@angular/core';
import { TodoStore } from '../../../services/todo.store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoRequest } from '../../../shared/interfaces/todo.interface';
import { Button } from 'primeng/button';
import { OPTIONS_STATUS_TODO } from '../../../constants/options-filter.constants';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-edit-todo-modal',
  imports: [Button, ReactiveFormsModule, InputTextModule, SelectModule],
  templateUrl: './create-edit-todo-modal.html',
  styleUrl: './create-edit-todo-modal.scss',
})
export class CreateEditTodoModal {
  // 1. Inyecciones necesarias
  private fb = inject(FormBuilder);
  private store = inject(TodoStore);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  // 2. Variables de control
  todoForm!: FormGroup;
  isEditMode = false;
  todoId?: number;

  statusTodo = OPTIONS_STATUS_TODO;

  ngOnInit() {
    // Extraemos el ID que pasamos desde el Footer o el Main
    this.todoId = this.config.data?.id;
    if (this.todoId) {
      this.isEditMode = true;
    }

    this.initForm();
  }

  initForm() {
    const defaultStatus = this.statusTodo.find((opt) => opt.value === false);
    this.todoForm = this.fb.group({
      task: ['', [Validators.required]],
      is_completed: [this.isEditMode ? null : defaultStatus],
    });

    if (this.isEditMode) {
      const todoActual = this.store.todos().find((t) => t.id === this.todoId);
      if (todoActual) {
        // Importante: Para que el select marque la opción correcta en edición,
        // debemos pasarle el objeto que coincida con el valor de la base de datos.
        const statusToPatch = this.statusTodo.find((opt) => opt.value === todoActual.is_completed);

        this.todoForm.patchValue({
          ...todoActual,
          is_completed: statusToPatch,
        });
      }
    }
  }

  onSave() {
    if (this.todoForm.invalid) return;

    // Extraemos los valores del form
    const formValues = this.todoForm.value;

    // Creamos el request extrayendo solo el .value del select
    const request: TodoRequest = {
      ...formValues,
      is_completed: formValues.is_completed?.value,
    };

    this.store.saveTodo(request, this.isEditMode ? this.todoId : undefined);
    this.ref.close();
  }

  onCancel() {
    this.ref.close();
  }
}

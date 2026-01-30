import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoStoreService } from '../../../services/todo-store.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { OPTIONS_STATUS_TODO } from '../../../constants/options-filter.constants';
import { Button } from 'primeng/button';
import { TodoRequest } from '../../../shared/interfaces/todo.interface';

@Component({
  selector: 'app-create-edit-todo-modal',
  imports: [ReactiveFormsModule, InputTextModule, Select, Button],
  templateUrl: './create-edit-todo-modal.html',
  styleUrl: './create-edit-todo-modal.scss',
})
export class CreateEditTodoModal implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(TodoStoreService);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  todoForm!: FormGroup;
  isEdit = false;
  todoId = 0;
  statusTodo = OPTIONS_STATUS_TODO;

  ngOnInit(): void {
    if (this.config.data.id > 0) {
      this.isEdit = true;
      console.log('editando', this.config.data.id);
      this.todoId = this.config.data.id;
    }
    this.initForm();
  }

  initForm() {
    const defaultStatus = this.statusTodo.find((opt) => opt.value === false);
    this.todoForm = this.fb.group({
      task: ['', Validators.required],
      is_completed: [this.isEdit ? null : defaultStatus],
    });
    if(this.isEdit){
      const todoActual = this.store.todo().find((t) => t.id === this.todoId);
      if(todoActual){
        const statusToPatch = this.statusTodo.find((opt) => opt.value === todoActual.is_completed);
        console.log(statusToPatch);
        this.todoForm.patchValue({
          ...todoActual,
          is_completed: statusToPatch,
        });
      }
    }
  }

  onSubmit() {
    console.log('LLAMANDO A ONSUBMIT');
    console.log(this.todoForm.value);
    if (this.todoForm.invalid) return;
    const formValues = this.todoForm.value;

    const request:TodoRequest = {
      task: formValues.task,
      is_completed: formValues.is_completed.value,
    };

    console.log(request);
    this.store.saveTodo(request, this.isEdit ? this.todoId : undefined);
    this.ref?.close();
  }

  onCancel() {
    console.log('LLAMANDO A ONCANCEL');
    this.ref?.close();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { ParamsTodoRetrieve } from '../../shared/interfaces/todo.interface';
import { DatePipe } from '@angular/common';
import { TodoStore } from '../../services/todo.store';
import { CreateEditTodoModal } from '../modals/create-edit-todo-modal/create-edit-todo-modal';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-main',
  imports: [TableModule, Button, DatePipe, ConfirmDialogModule, ToastModule],
  providers: [DialogService, ConfirmationService, MessageService],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  // Inyectamos el Store en lugar del Service directamente
  protected todoStore = inject(TodoStore);
  _dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  ngOnInit() {
    this.fetchInitialData();
  }

  fetchInitialData() {
    const params: ParamsTodoRetrieve = {
      filter: 'retrieveType:LWPT',
      sort: 'id,asc',
      limit: 100,
      offset: 0,
    };

    // Llamamos a la acción del store
    this.todoStore.loadTodos(params);
  }

  // main.ts
  showEditModal(todoId: number) {
    this._dialogService.open(CreateEditTodoModal, {
      modal: true,
      closable: true,
      header: 'Editar Todo',
      width: '70%',
      data: { id: todoId },
    });
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLButtonElement,
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.todoStore.deleteTodo(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Tarea borrada correctamente',
        });
      },
    });
  }
}

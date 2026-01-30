import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { ParamsTodoRetrieve } from '../../shared/interfaces/todo.interface';
import { DatePipe } from '@angular/common';
import { CreateEditTodoModal } from '../modals/create-edit-todo-modal/create-edit-todo-modal';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TodoService } from '../../services/todo.service';
import { TodoStoreService } from '../../services/todo-store.service';
@Component({
  selector: 'app-main',
  imports: [TableModule, Button, DatePipe, ConfirmDialogModule, ToastModule],
  providers: [DialogService, ConfirmationService, MessageService],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  _todoService = inject(TodoService);
  _todoStoreService = inject(TodoStoreService);
  _dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  ngOnInit() {
    console.log('ngOnInit de componente main');
    this.getTodos();
  }

  getTodos() {
    const paramsWithPagination: ParamsTodoRetrieve = {
      filter: 'retrieveType:LWPT',
      sort: 'id,asc',
      limit: 100,
      offset: 0,
    };
    const paramsById: ParamsTodoRetrieve = { filter: 'retrieveType:GBIT,todoId:1' };
    /*
    const paramsWithPaginationAndSearchTerm: ParamsTodoRetrieve = {
      filter: 'retrieveType:LWPT,searchTerm:el',
      sort: 'task,asc',
      limit: 13,
      offset: 0,
    };
    */
    this._todoStoreService.loadTodos(paramsWithPagination);
  }

  openEditModal(todoId: number) {
    console.log('openEditModal', todoId);
    this._dialogService.open(CreateEditTodoModal, {
      modal: true,
      closable: true,
      header: 'Editar tarea',
      width: '50%',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: { id: todoId },
    });
  }

  confirmDelete(event: Event, id: number) {
    console.log('confirmDelete', id);
    console.log(event);
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
        this._todoStoreService.deleteTodo(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'Tarea borrada correctamente',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: 'Se cancelo la eliminación de la tarea',
        });
      },
    });
  }
}

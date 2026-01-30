import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditTodoModal } from '../modals/create-edit-todo-modal/create-edit-todo-modal';

@Component({
  selector: 'app-footer',
  imports: [Button],
  providers: [DialogService],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  _dialogService = inject(DialogService);

  ref: DynamicDialogRef | null = null;
  openCreateModal() {
    console.log('Abriendo modal');
    this.ref = this._dialogService.open(CreateEditTodoModal, {
      modal: true,
      closable: true,
      header: 'Crear tarea',
      width: '50%',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: { id: 0 },
    });
  }
}

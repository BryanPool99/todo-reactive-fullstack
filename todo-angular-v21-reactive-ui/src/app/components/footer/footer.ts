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
  ref: DynamicDialogRef | null = null;

  _dialogServie = inject(DialogService);

  showModal() {
    this.ref = this._dialogServie.open(CreateEditTodoModal, {
      modal: true,
      closable: true,
      header: 'Crear Todo',
      width: '70%',
      data: { id: 0 },
    });
  }
}

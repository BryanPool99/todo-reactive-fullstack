import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTodoModal } from './create-edit-todo-modal';

describe('CreateEditTodoModal', () => {
  let component: CreateEditTodoModal;
  let fixture: ComponentFixture<CreateEditTodoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTodoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTodoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

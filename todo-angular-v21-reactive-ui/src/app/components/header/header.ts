import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { OPTIONS_STATUS_TODO } from '../../constants/options-filter.constants';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-header',
  imports: [
    Button,
    SelectModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  title = input.required<string>();
  optionsFilter = OPTIONS_STATUS_TODO;
  formSearch!: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit() {
    console.log('Inicio de componente header');
    this.initForm();
  }

  initForm() {
    this.formSearch = this.fb.group({
      search: [''],
      filterStatus: [''],
    });
  }

  onSubmit() {
    console.log('LLAMANDO A ONSUBMIT');
  }
}

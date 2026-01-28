import { Component, inject, signal, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { Footer } from './components/footer/footer';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, Header, Main, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Todo List');


  ngOnInit(): void {
    console.log('Inicio de componente app');
  }
}

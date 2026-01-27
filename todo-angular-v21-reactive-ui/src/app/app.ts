import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";

@Component({
  selector: 'app-root',
  imports: [ButtonModule, Header, Main],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Todo List');
}

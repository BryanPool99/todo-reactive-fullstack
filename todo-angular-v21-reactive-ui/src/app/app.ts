import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [ButtonModule, Header, Main, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Todo List');
}

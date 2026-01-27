import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from "primeng/button";
@Component({
  selector: 'app-main',
  imports: [TableModule, Button],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
array = [1,2,3,1,1,1,1,1]
}

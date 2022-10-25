import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@full-stack-todo-list-app-with-angular-and-nestjs/api-interfaces';

@Component({
  selector: 'full-stack-todo-list-app-with-angular-and-nestjs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}

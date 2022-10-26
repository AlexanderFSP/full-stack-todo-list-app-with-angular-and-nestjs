import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreateTask } from './models/create-task.model';
import { ITask } from './models/task.model';
import { IUpdateTask } from './models/update-task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private readonly http: HttpClient) {}

  public create(body: ICreateTask): Observable<ITask> {
    return this.http.post<ITask>('/api/tasks', body);
  }

  public findAll(): Observable<ITask[]> {
    return this.http.get<ITask[]>('/api/tasks');
  }

  public update(id: number, body: IUpdateTask): Observable<ITask> {
    return this.http.patch<ITask>(`/api/tasks/${id}`, body);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public remove(id: number): Observable<any> {
    return this.http.delete(`/api/tasks/${id}`);
  }
}

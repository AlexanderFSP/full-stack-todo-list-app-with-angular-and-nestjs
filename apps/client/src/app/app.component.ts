import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITask } from './services/tasks/models/task.model';
import { TasksService } from './services/tasks/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSelectionList) public selectionList!: MatSelectionList;

  public tasks$: Observable<ITask[]>;
  public tasksLoaded$: Observable<boolean>;

  public readonly newTask = new FormControl<string>('');

  private readonly _tasks$ = new BehaviorSubject<ITask[]>([]);
  private readonly _tasksLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly tasksService: TasksService) {
    this.tasks$ = this._tasks$.asObservable();
    this.tasksLoaded$ = this._tasksLoaded$.asObservable();
  }

  public ngOnInit(): void {
    this.loadTasks();
  }

  public onAddTask(): void {
    const content = this.newTask.value?.trim();

    if (content?.length) {
      this.tasksService.create({ content }).subscribe(task => {
        this.newTask.reset('');

        this._tasks$.next([...this._tasks$.value, task]);
      });
    }
  }

  public onSelectionChange({ options }: MatSelectionListChange): void {
    this.selectionList.setDisabledState(true);

    const option = options[0];
    const task = option.value as ITask;

    this.tasksService
      .update(task.id, { completed: !task.completed })
      .pipe(finalize(() => this.selectionList.setDisabledState(false)))
      .subscribe({
        // Revert selection
        error: () => option.toggle()
      });
  }

  private loadTasks(): void {
    this.tasksService
      .findAll()
      .pipe(catchError(() => of([])))
      .subscribe(tasks => {
        this._tasks$.next(tasks);
        this._tasksLoaded$.next(true);
      });
  }
}

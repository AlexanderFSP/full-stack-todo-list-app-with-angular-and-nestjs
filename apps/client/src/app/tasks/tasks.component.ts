import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITask } from '../services/tasks/models/task.model';
import { TasksService } from '../services/tasks/tasks.service';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class TasksComponent implements OnInit {
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

  public onDeleteTask(event: Event, task: ITask): void {
    event.stopPropagation();

    this.selectionList.setDisabledState(true);

    this.tasksService
      .remove(task.id)
      .pipe(
        finalize(() => this.selectionList.setDisabledState(false)),
        untilDestroyed(this)
      )
      .subscribe(() => {
        const tasks = this._tasks$.value;
        const taskIdx = tasks.findIndex(({ id }) => task.id === id);

        if (taskIdx !== -1) {
          tasks.splice(taskIdx, 1);
        }

        this._tasks$.next(tasks);
      });
  }

  public onAddTask(): void {
    const content = this.newTask.value?.trim();

    if (content?.length) {
      this.tasksService
        .create({ content })
        .pipe(untilDestroyed(this))
        .subscribe(task => {
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
      .pipe(
        finalize(() => this.selectionList.setDisabledState(false)),
        untilDestroyed(this)
      )
      .subscribe({
        // Revert selection
        error: () => option.toggle()
      });
  }

  private loadTasks(): void {
    this.tasksService
      .findAll()
      .pipe(
        catchError(() => of([])),
        untilDestroyed(this)
      )
      .subscribe(tasks => {
        this._tasks$.next(tasks);
        this._tasksLoaded$.next(true);
      });
  }
}

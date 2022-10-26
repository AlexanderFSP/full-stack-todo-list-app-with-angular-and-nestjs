import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ITaskView {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSelectionList) public selectionList!: MatSelectionList;

  public tasks$: Observable<ITaskView[]>;

  public readonly newTask = new FormControl<string>('');

  private readonly _tasks$ = new BehaviorSubject<ITaskView[]>([]);

  constructor() {
    this.tasks$ = this._tasks$.asObservable();
  }

  public async onAddTask(): Promise<void> {
    const task = this.newTask.value?.trim();

    if (task?.length) {
      try {
        // TODO: Integrate with back

        this.newTask.reset('');

        // TODO: Update tasks
        // eslint-disable-next-line no-empty
      } catch {}
    }
  }

  // TODO: option -> options
  public async onSelectionChange({ options }: MatSelectionListChange): Promise<void> {
    this.selectionList.setDisabledState(true);

    console.log(options);

    // TODO: Uncomment
    // const task = option.value as ITaskView;

    try {
      // TODO: Integrate with back
      // TODO: Update tasks
    } catch {
      // TODO: Revert selection
      // option.toggle();
    } finally {
      this.selectionList.setDisabledState(false);
    }
  }
}

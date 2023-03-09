import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { TasksService } from "../../services/tasks.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from "../../modals/confirm-modal.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit, OnDestroy {

  private destroyObservable$: Subject<boolean> = new Subject();

  public tasksList = []
  public displayedColumns: string[] = ['name', 'type', 'action-edit', 'action-delete'];

  constructor(
    private tasksService: TasksService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.tasksService.getTasksList()
      .pipe(takeUntil(this.destroyObservable$))
      .subscribe(tasksList => {
        this.tasksList = tasksList;
      });
  }

  public onEdit(task: any) {
    this.router.navigate([`/task/${task._id}`]);
  }

  public onAdd() {
    this.router.navigate([`/task`]);
  }

  public onDelete(task: any) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { name: task.name, type: task.type },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.tasksService.deleteTask(task._id)
        .pipe(takeUntil(this.destroyObservable$))
        .subscribe(res => {
          this.loadData();
        }, err => {
          this.snackBar.open('Saved successfully', 'Success');
        });
    });
  }

  ngOnDestroy() {
    this.destroyObservable$.next(true);
    this.destroyObservable$.complete();
  }
}

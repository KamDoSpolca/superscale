import { Component, OnDestroy, OnInit } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { TaskModel, tasksTypes, taskTypeFields } from "../../interface/task.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss']
})
export class TasksFormComponent implements OnInit, OnDestroy {

  public formGroup: UntypedFormGroup;
  public types = tasksTypes;

  private taskId: any;
  private task: any = {};
  private destroyObservable$: Subject<boolean> = new Subject();

  constructor(
    private tasksService: TasksService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.route.params.subscribe((params: Params): void => {
      this.taskId = params['id'];
    });

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      type: this.types[0].value
    });

    this.setFields();
  }

  ngOnInit() {
    if (this.taskId) {
      this.tasksService.getTask(this.taskId)
        .pipe(takeUntil(this.destroyObservable$))
        .subscribe(task => {
          this.task = TaskModel.mapFromAPI(task);
          // Preset with loaded data
          this.formGroup.get('name')?.setValue(this.task.name);
          this.formGroup.get('type')?.setValue(this.task.type);
          this.setFields();
          this.fieldsData.forEach(item => {
            this.formGroup.get(item)?.setValue(this.task.fields[item]);
          });
        }, err => {
          this.snackBar.open('Task with selected ID not found', 'Error');
        });
    }
  }

  public onChangeDropdown(e: any) {
    this.setFields();
  }

  public setFields() {
    this.fieldsData.forEach(item => {
      this.formGroup.removeControl(item);
    });

    const fieldsMap = taskTypeFields;
    const selectedType: string = this.returnFormValue('type')?.value ?? this.returnFormValue('type');

    const fieldsList: any = fieldsMap.find(item => (Object.keys(item)[0]) === selectedType);

    fieldsList[selectedType].forEach((field: any) => {
      const key = Object.keys(field)[0];
      this.formGroup.addControl(key, new FormControl(field[key], Validators.required));
    });
  }

  public returnFormValue(formFieldName: any): any {
    return this.formGroup.get(formFieldName)?.value;
  }

  public onSubmitForm() {
    this.task.type = this.returnFormValue('type');
    this.task.name = this.returnFormValue('name');
    this.task.fields = {};

    this.fieldsData.forEach((item: any) => {
      const value = this.returnFormValue(item);
      // TO DO - rework model to set directly input type like dropdown, textfield, calendar, number etc.    
      this.task.fields[item] = item === 'durationInHours' ? parseInt(value) : value;
    });

    const sub$ = this.taskId ? this.tasksService.putTask(this.taskId, this.task) : this.tasksService.postTask(this.task);
    sub$
      .pipe(takeUntil(this.destroyObservable$))
      .subscribe(res => {
        this.snackBar.open('Saved successfully', 'Success');
        // navigate back to table
        this.router.navigate(['']);
      }, error => {
        this.snackBar.open('Error during saving your request', 'Error');
      });
  }

  get fieldsData() {
    const entries = Object.entries(this.formGroup.controls);
    let reducedFields: any[] = [];
    entries.forEach(item => {
      // TO DO - Should use formArray or sub-formGroup in formGroup for fields
      if (item[0] !== 'type' && item[0] !== 'name') {
        reducedFields.push(item[0]);
      }
    });

    return reducedFields;
  }

  ngOnDestroy() {
    this.destroyObservable$.next(true);
    this.destroyObservable$.complete();
  }
}

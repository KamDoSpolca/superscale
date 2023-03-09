import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';

const routes: Routes = [
  { path: '', component: TasksTableComponent },
  { path: 'task/:id', component: TasksFormComponent },
  { path: 'task', component: TasksFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

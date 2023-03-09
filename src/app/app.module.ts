import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksFormComponent } from './components/tasks-form/tasks-form.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TasksService } from './services/tasks.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmModalComponent } from './modals/confirm-modal.component';
import { MenuComponent } from './components/menu/menu.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    TasksTableComponent,
    TasksFormComponent,
    ConfirmModalComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    // Angular Material
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }

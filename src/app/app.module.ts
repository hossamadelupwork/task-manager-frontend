import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { LoginComponent } from './components/login/login.component';
import { TitleComponent } from './components/title/title.component';
import { PipelinesComponent } from './components/pipelines/pipelines.component';
import { CreatePipelineFormComponent } from './components/create-pipeline-form/create-pipeline-form.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';


import {ReactiveFormsModule} from "@angular/forms";
import { SwimlanesComponent } from './components/swimlanes/swimlanes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TitleComponent,
    PipelinesComponent,
    CreatePipelineFormComponent,
    CreateTaskFormComponent,
    SwimlanesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

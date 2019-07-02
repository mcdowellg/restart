import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FullCalenderComponent } from './full-calender/full-calender.component';
// import { FullCalendarModule } from 'ng-fullcalendar'
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

import { DatePipe } from '@angular/common';
import { ChoosePeopleMachinesComponent } from './choose-people-machines/choose-people-machines.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import 'hammerjs';

import { DataTableComponent } from './data-table/data-table.component';
import { HeaderComponent } from './header/header.component';

import { DataTablesModule } from 'angular-datatables';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { MapChartComponent } from './map-chart/map-chart.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BlockDetailsComponent } from './block-details/block-details.component';
import { BlockDragComponent } from './block-details/block-drag/block-drag.component';
import { TaskInputComponent } from './block-details/task-input/task-input.component';


@NgModule({
  declarations: [
    AppComponent,
    // FullCalenderComponent,
    ChoosePeopleMachinesComponent,
    DataTableComponent,
    HeaderComponent,
    GanttChartComponent,
    MapChartComponent,
    CalendarComponent,
    BlockDetailsComponent,
    BlockDragComponent,
    TaskInputComponent,
    
   
  ],
  imports: [
    
	RouterModule.forRoot([
	{
		path: "full-calendar", 
		component: CalendarComponent
  },
  {
		path: "block-details", 
		component: BlockDetailsComponent
	},
	{
		path: "data-table", 
		component: DataTableComponent
  },
	{
		path: "gantt-chart", 
		component: GanttChartComponent
  },
	{
		path: "map-chart", 
		component: MapChartComponent
  }
	]),
	  DataTablesModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DragDropModule,
    FullCalendarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ChoosePeopleMachinesComponent]
})
export class AppModule { }

import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { OptionsInput } from '@fullcalendar/core';
import { NgZone } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';
import { EventsService } from '../events.service'
import { MatDialog, MatDialogModule, MatFormField, MatDialogRef} from '@angular/material';
import { ChoosePeopleMachinesComponent } from '../choose-people-machines/choose-people-machines.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule, MatNativeDateModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

import Tooltip from 'tooltip.js'
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-full-calender',
  templateUrl: './full-calender.component.html',
  styleUrls: ['./full-calender.component.css']
})
export class FullCalenderComponent implements AfterViewInit {

constructor(private eventservice: EventsService, 
            private zone: NgZone,
            public dialog: MatDialog,
            public element: ElementRef
) { 
  console.log(this.element.nativeElement);
}



calendarOptions: OptionsInput;
  events: any;
  lists: any;
  displayEvent: any;
  listings:any;
  popUp: any;
  selections: any;

  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;
  @ViewChild('dropremove') checkbox: any;
  @ViewChildren('draggableel') draggable: any;
  // @ViewChildren(.fc-day-grid-event) tooltips: any;

  ngAfterViewInit() {

this.popUp = false;

setTimeout(()=>{

let weeks: any = elef.querySelectorAll(".fc-row").length;
      // loop to assign all attributes to DOM elements
      console.log(weeks);

      var i: number;
      for(i=0; i<weeks;i++){
        elef.querySelectorAll(".fc-row")[i].style.zIndex=20-i;     
        console.log(elef.querySelectorAll(".fc-row")[i]);     
        console.log("fc row");
        }

this.refreshToolTips();

  }, 4000)

var elef = this.element.nativeElement;


// shows the data is not ready for the css file to use, thus no attr assigned yet
console.log(this.element.nativeElement.querySelectorAll(".fc-content")[0]);
this.checkbox.nativeElement.checked = true;
// console.log(this.draggable._results[0].nativeElement)
    
    
// setTimeout(()=>{console.log(this.draggable._results["0"].nativeElement.innerHTML)}, 4000)


    this.events = this.eventservice.getData()
    .subscribe(
          res => {
            console.log(res)
            console.log("initialise events");
            this.events = res;
          },
          err => {
            console.log("Error occured");
          }
        );

    this.listings = [{"name":"hi"},{"name":"hey"},{"name":"hello"}]
    console.log(this.listings);

    this.lists = this.eventservice.getListData()
    .subscribe(
          res => {
            console.log(res)
            
            let arr = [];
            for (let prop in res){
              console.log(arr)
              arr.push(res[prop]);
            }
            
            console.log("find new listed jobs");
            this.lists = arr;
            console.log(arr)
          },
          err => {
            console.log("Error occured in loading lists");
          }
        );

setTimeout(()=>{

  console.log("why the hell is this not working!");
console.log(this.draggable._results.length);

    for (var i = 0; i < this.draggable._results.length; i++) {
      // this.draggable._results[i].nativeElement.draggable = true;
      // console.log(this.draggable);
      new Draggable(this.draggable._results[i].nativeElement, {
      });
    }
  }, 4000)


    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      // titleFormat: 'MMM D YYYY',
        //  header: {
        //     left: 'prev,next today myCustomButtons',
        //     center: 'title',
        //     right: 'month,week,agendaDay'
        //  },
      selectable: true,
      droppable: true,
      events: this.events,

      buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
         },
         views: {
            agenda: {
               eventLimit: 2
            }
         },
   
    //   eventRender: function(info) {
    //   var tooltip = new Tooltip(info.el, {
    //     title: info.event.extendedProps.description,
    //     placement: 'top',
    //     trigger: 'hover',
    //     container: 'body'
    //   });
    // },

      // customButtons: {
      //   myCustomButton: {
      //     text: 'custom!',
      //     click: function() {
      //       alert('clicked the custom button!');
      //     }
      //   }
      // },

      header: {
        left: '',
        center: 'title',
        right: 'prev,next today'
        // right: 'dayGridMonth,dayGridWeek,timeGridDay'
      },

      buttonIcons: {
        prev: 'left-single-arrow',
        next: 'right-single-arrow',
      },

      plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ]
    };
    
  }
  
  eventrender(event)
    {
      

      console.log(event);
      
      // this.refreshToolTips();
      console.log("This should mean that the event has been updated in DB, DOM and also in the tooltips");
      // var el = this.element.nativeElement;
      // console.log(event);
      // el.querySelectorAll(".fc-content")[0].setAttribute("data-tooltip", "too!")
      // el.querySelectorAll("a")[0].setAttribute("aria-label", "Button that displays")
      // console.log("attributes set");
      // console.log(el.querySelectorAll("a")[0])
    }

refreshToolTips(){
  console.log("starting the Tooltips refresh");
  var elef = this.element.nativeElement;  
      setTimeout(()=> {

      var el = this.element.nativeElement;
          console.log(Object.values(this.events[0]).join("\r\n"));
      // want a date ordered array
      this.events.sort(function(a,b){
      var A = new Date(a.start);
      var B = new Date(b.start);
      return A > B ? 1 : -1;
      });
      
      let elements: any = el.querySelectorAll(".fc-content").length;
      // loop to assign all attributes to DOM elements
      var i: number;
      for(i=0; i<elements;i++){
          this.events.map((att, index)=> {
            // console.log(el.querySelectorAll(".fc-content")[i].innerText.replace(/\s/g,'') === att.title.replace(/\s/g,''))
            if(el.querySelectorAll(".fc-content")[i].innerText.replace(/\s/g,'') === att.title.replace(/\s/g,'')) {
              var html = this.events[index].title + '\n' + this.events[index]._id + '\n' + this.events[index].Staff + '\n' + this.events[index].Machine;
              var zForContent = el.querySelectorAll(".fc-content")[i].style.zIndex=2000-i;
              el.querySelectorAll(".fc-content")[i].setAttribute("data-tooltip", html)  
              
            }
        })
      }

      console.log(el.querySelectorAll(".fc-title")[0].style.zIndex);
      console.log("an element of DOM");

      console.log(el.querySelectorAll(".fc-content"))
      this.popUp = true;
      console.log("fccontent");
      console.log(this.events);
      console.log("event content");

      // console.log(el.querySelectorAll("a")[0].setAttribute("mattooltip", "tooltips is here now!"))
        }, 1000)

    console.log(elef.querySelectorAll(".fc-content"));
    // console.log(elef.querySelectorAll(".fc-title")[0].style.zIndex);

    console.log("finishing the Tooltips refresh and showing content then title zIndexes");
}



  eventClick(model) {
    this.displayEvent = model.event._calendar.component.props.currentDate;
    console.log(model.event.extendedProps._id);
    console.log("clicking event");
    // want to include a pop up screen here to allow the event to be modified
    // this.popUp = true;
    let dialog = this.dialog.open(ChoosePeopleMachinesComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (selection) {
          this.selections = selection;
          // selections here is an array of those items selected
          console.log(this.selections);
          // next want to patch this info to DB
          console.log("patch testing");
          console.log(model.event.extendedProps._id);
              this.eventservice.updateEvent(model.event.extendedProps._id, {
              "Staff": this.selections[1],
              "Machine": this.selections[0]
                })
                .subscribe(
                res => {
                  console.log(res);
                  console.log("update events");
                  //this.events = this.events.concat();
                  
                  console.log(this.events);
                  this.refreshToolTips();
                },
                err => {
                  console.log("Error occured");
                }
          );

        } else {
          // User clicked 'Cancel' or clicked outside the dialog
          console.log("didn't work :(")
        }
      });

// this.refreshToolTips();

console.log("this means I don't require a render method from the click event")
  }
  eventDragStop(model) {
    this.events = this.events.concat();
    console.log("are we here?")
    console.log(model.event._calendar.component.props.currentDate);
  }
  dateClick(model) {
    console.log(model);
  }
  drop(model) {
    console.log(model);
  }

  dropped(model) {

    this.eventservice.PostEvent({
    "title": model.draggedEl.innerHTML,
    "start": model.dateStr
    })
    .subscribe(
          res => {
            console.log(res[0]);
            console.log("post events");
            
            // this.events.push(res)
            // this.events = this.events.slice(0,3);
            this.events = this.events.concat(res);

          },
          err => {
            console.log("Error occured");
          }
    );

    this.refreshToolTips();

    
    if(this.checkbox.nativeElement.checked){
          console.log("yes this is working baby!")
          console.log(this.checkbox.nativeElement.checked);
    }

  }
  clickButton(model) {
    console.log(model);
  }
  updateEvent(model: any) {
    console.log("or are we here?");
    console.log(model);
    console.log(model.event.extendedProps._id);
  
    this.eventservice.updateEvent(model.event.extendedProps._id, {
        "start": model.event.start,
        "end": model.event.end,
        "allDay": true,
        "Staff": model.event.Staff,
        "Machine": model.event.Machine
    })
    .subscribe(
          res => {
            console.log(res);
            console.log("update events");
            // this.events = this.events.concat(res);

        //   let array = Object
        // .entries(res)
        // // .map(([key, value]) => ({ [key]: value }))
        // .join(",")
        // JSONparse()
            
            this.events.map((obj, index) => {
              if(res._id === obj._id) {
                console.log("showme the money");
                console.log(index);
                this.events[index] = res
              } 
            })
            // this.events.map(obj => res._id === obj._id);
            console.log(this.events);
            this.refreshToolTips();
          },
          err => {
            console.log("Error occured");
          }
    );

  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
}



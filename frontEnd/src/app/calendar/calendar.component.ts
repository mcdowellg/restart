import timeGridPlugin from '@fullcalendar/timegrid';
import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventsService } from '../events.service';
import listPlugin from '@fullcalendar/list';
import { MatDialog} from '@angular/material';
import { ChoosePeopleMachinesComponent } from '../choose-people-machines/choose-people-machines.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, AfterViewInit {

  constructor(private eventservice: EventsService,
              public dialog: MatDialog,
              public element: ElementRef) { 
}

  options: OptionsInput;
  events: any;
  lists: any;
  displayEvent: any;
  listings:any;
  popUp: any;
  selections: any;
  testEvent: any;

  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  @ViewChild('dropremove') checkbox: any;
  @ViewChild('externalevents') containerEl: any;
  @ViewChildren('draggableel') draggable: any;

  ngOnInit() {
    this.testEvent = "4:00:00";
    this.options = {
      allDayDefault: false,
      aspectRatio:1.5,
      allDayText:"All Day",
      slotLabelFormat:{
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: 'short'
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday
      
        startTime: '8:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek timeGridDay dayGridMonth, listWeek'
      },
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]
    };


    this.events = this.eventservice.getData()
    .subscribe(
          res => {
            // console.log(res)
            console.log("initialise events");
            this.events = res;
          },
          err => {
            console.log("Error occured");
          }
        );

  }

  ngAfterViewInit(){

    this.lists = this.eventservice.getListData()
    .subscribe(
          res => {
            // console.log(res)
                
            let arr = [];
              for (let prop in res){
                  // console.log(arr)
                  arr.push(res[prop]);
            }
                
            console.log("find new listed jobs");
            this.lists = arr;
            // console.log(arr)
            },
            err => {
              console.log("Error occured in loading lists");
            }
          );

    var elef = this.element.nativeElement;

    setTimeout(()=>{

      let weeks: any = elef.querySelectorAll(".fc-row").length;
            // loop to assign all attributes to DOM elements
            // console.log(weeks);
      
            var i: number;
            for(i=0; i<weeks;i++){
              elef.querySelectorAll(".fc-row")[i].style.zIndex=20-i;     
              // console.log(elef.querySelectorAll(".fc-row")[i]);     
              // console.log("fc row");
              }
      
      this.refreshToolTips();
      
      }, 4000)

    setTimeout(()=>{

          console.log("why the hell is this not working!");
        // console.log(this.draggable._results[0]);

        // new Draggable(this.draggable._results[0].nativeElement, {
        //   eventData: {
        //     title: 'my event',
        //     duration: '02:00'
        //   }
        // });
        
        // for (var i = 0; i < this.draggable._results.length; i++) {
          // this.draggable._results[i].nativeElement.draggable = true;
          // console.log(this.draggable);
          new Draggable(this.containerEl.nativeElement, {
            itemSelector: '.drag',
            
            eventData: function(eventEl) {
              console.log("...think once the task has been brought through via a data transfer, as a service, or temporary array (not great as lost everytime browser is refreshed), then can pass variables from the task, (using a lookup on the draggable element text), into eventData which will provide the values upon drop through the eventReceive(), meaning eventReceive should then update the DB via data service rather than through the use of dropped() as used previously.")
              console.log(eventEl)
              return {
                title: eventEl.innerText,
                duration: { hours: 10 }, 
                machine: "Greg's the man"
              };
            }
            
          });
        // }
  }, 4000)

  }


// All Methods below:

eventReceive(event){
  console.log("the event has been received.....................................................................................................................................................................................................................")
  console.log(event)
}

eventrender(event)
    {
      console.log("This should mean that the event has been updated in DB, DOM and also in the tooltips");
    }

refreshToolTips(){
  console.log("starting the Tooltips refresh");
  var elef = this.element.nativeElement;  
      setTimeout(()=> {

      var el = this.element.nativeElement;
          // console.log(Object.values(this.events[0]).join("\r\n"));
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

      // console.log(el.querySelectorAll(".fc-title")[0].style.zIndex);
      // console.log("an element of DOM");

      // console.log(el.querySelectorAll(".fc-content"))
      this.popUp = true;
      // console.log("fccontent");
      // console.log(this.events);
      // console.log("event content");

      // console.log(el.querySelectorAll("a")[0].setAttribute("mattooltip", "tooltips is here now!"))
        }, 1000)

    // console.log(elef.querySelectorAll(".fc-content"));
    // console.log(elef.querySelectorAll(".fc-title")[0].style.zIndex);

    console.log("finishing the Tooltips refresh and showing content then title zIndexes");
}



  eventClick(model) {
    this.displayEvent = model.event._calendar.component.props.currentDate;
    // console.log(model.event.extendedProps._id);
    console.log("clicking event");
    // want to include a pop up screen here to allow the event to be modified
    // this.popUp = true;
    let dialog = this.dialog.open(ChoosePeopleMachinesComponent);

    dialog.afterClosed()
      .subscribe(selection => {
        if (selection) {
          this.selections = selection;
          // selections here is an array of those items selected
          // console.log(this.selections);
          // next want to patch this info to DB
          console.log("patch testing");
          // console.log(model.event.extendedProps._id);
              this.eventservice.updateEvent(model.event.extendedProps._id, {
              "Staff": this.selections[1],
              "Machine": this.selections[0]
                })
                .subscribe(
                res => {
                  // console.log(res);
                  console.log("update events");
                  //this.events = this.events.concat();
                  
                  // console.log(this.events);
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
    // console.log(model.event._calendar.component.props.currentDate);
  }
  dateClick(model) {
    console.log(model);
  }
  drop(model) {
    console.log(model);
  }

  dropped(model) {
    console.log(model);
    this.eventservice.PostEvent({
    "title": model.draggedEl.innerHTML,
    "start": model.dateStr
    })
    .subscribe(
          res => {
            // console.log(res[0]);
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
          // console.log(this.checkbox.nativeElement.checked);
    }

  }
  clickButton(model) {
    console.log(model);
  }
  updateEvent(model: any) {
    console.log("or are we here?");
    // console.log(model);
    // console.log(model.event.extendedProps._id);
  
    this.eventservice.updateEvent(model.event.extendedProps._id, {
        "start": model.event.start,
        "end": model.event.end,
        "allDay": false,
        "Staff": model.event.Staff,
        "Machine": model.event.Machine
    })
    .subscribe(
          res => {
            // console.log(res);
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
                // console.log(index);
                this.events[index] = res
              } 
            })
            // this.events.map(obj => res._id === obj._id);
            // console.log(this.events);
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


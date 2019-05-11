
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  
  constructor(private eventservice: EventsService) {}

  dtOptions: DataTables.Settings = {};
  roster: any;
  Info: any;
  AnotherBox: any;
  Names: any;
  Dates: any;
  aTrigger: Subject<any> = new Subject();
  earlyAll: any;
  lateAll: any;
  loaded: boolean;

  ngOnInit(): any {
    
    this.loaded = false;
    this.earlyAll = [];
    this.lateAll = [];

    // setTimeout(()=> {
            this.loaded = true;
            
          // }, 2000)
          // setTimeout(()=> {
		this.roster = this.eventservice.getData()
		.subscribe(
          res => {
            console.log("initialise roster");
            this.roster = res;

            // Here will manipulate the data to present as a roster 

            var getDateArray = function(start, end) {
              var arr = new Array();
              var dt = new Date(start);
              end = new Date(end);
              
              while (dt <= end) {
                  arr.push((new Date(dt)).toString().substring(0,15)); //save only the Day MMM DD YYYY part
                  dt.setDate(dt.getDate() + 1);
              }
              return arr;
              }

          var i: number;
          var longest: any = [];
          
          for(i=0; i<this.roster.length;i++){
            var endDate: any;
            
            if (this.roster[i].end) {endDate = this.roster[i].end}
            else {endDate = this.roster[i].start}

              this.roster[i].dates = getDateArray(this.roster[i].start, endDate);
              // find longest date array for later
              if (this.roster[i].dates.length>longest) {longest = this.roster[i].dates.length};
              // get latest
              var late = this.roster[i].dates.reduce(function (pre, cur) {
                return Date.parse(pre) < Date.parse(cur) ? cur : pre;
              });
            
              // now reduce again on latest
              this.lateAll.push(late)
            
              // get earliest
              var early = this.roster[i].dates.reduce(function (pre, cur) {
                return Date.parse(pre) > Date.parse(cur) ? cur : pre;
              });
            
              // now reduce again on earliest
              this.earlyAll.push(early)
          }

          var overallEndDate = this.lateAll.reduce(function (pre, cur) {
            return Date.parse(pre) < Date.parse(cur) ? cur : pre;
          });

          var overallStartDate = this.earlyAll.reduce(function (pre, cur) {
            return Date.parse(pre) > Date.parse(cur) ? cur : pre;
          });
      
          // console.log(this.earlyAll);
          // console.log(this.lateAll);
          // console.log(overallStartDate)
          // console.log(overallEndDate)

          this.Dates = getDateArray(overallStartDate,overallEndDate);

          // Use Dates to create an array with Titles and the Staff Name

          // console.log(this.roster[1].dates.flat())
        
          this.Info = [];// Array(this.Dates.length).fill(Array(this.Dates.length));
          this.Names = [];
          // Create a new blank array to hold all the event dates as a matrix
          for (i=0; i<this.roster.length;i++) {
            this.Info[i] = new Array(this.Dates.length)
          }

          // Info loop starts here as mentioned below
          this.Info.map((a,j) => {
          // Create a new blank array to fill for each date
            this.AnotherBox = [];
            for (i=0; i<longest;i++) {
              this.AnotherBox[i] = new Array(this.Dates.length)
            }
              this.AnotherBox.map((o, i) => {
                var oneArray = this.Dates.map((obj, index) => {
                  if (this.roster[j].dates[i] === obj){this.AnotherBox[i][index] = this.roster[j].title}
                  else {this.AnotherBox[i][index] = ""};
                  // this.AnotherBox[i][index] = this.roster[j].dates[i] === obj;
                })
              })

            // Now need to flatten or condense these five rows into one.
            
            this.AnotherBox = this.AnotherBox.reduce((a, b) => a.map((c, i) => b[i] || c));
            this.Info[j] = this.AnotherBox;
            if (this.roster[j].Staff) {this.Names[j] = this.roster[j].Staff}
            else {this.Names[j] = " "};
          // Now need to map on all events so have created Info.map in above loop
          })

          // Now transpose data for html format

          this.Info = this.Info[0].map((col, i) => this.Info.map(row => row[i]));

          // Add the staff names to the front of the array

          this.Info.unshift(this.Names);

          // Now transpose back!

          this.Info = this.Info[0].map((col, i) => this.Info.map(row => row[i]));

          console.log("roster with dates")
          console.log(this.Info);
          console.log(this.Dates);
          console.log(this.Names);
          
          this.aTrigger.next();
          
          },
          err => {
            console.log("Error occured");
          }
        );
      // }, 2000)

  setTimeout(()=>{
          
	  $(document).ready(function() {
    var table = $('#example').DataTable();
	 
    $('#example tbody')
        .on( 'mouseenter', 'td', function () {
            var colIdx = table.cell(this).index().column;
 
            $( table.cells().nodes() ).removeClass( 'highlight' );
            $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
			console.log("colIndex on mouseenter");
        } );
} );

}, 500)
	
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}

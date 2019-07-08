  import {Component, OnInit } from '@angular/core';
  import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
  import { EventsService } from '../events.service'
  import { FormBuilder } from '@angular/forms';
  import { Validators } from '@angular/forms';  

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})

export class BlockDetailsComponent implements OnInit {

  constructor(private eventservice: EventsService, private fb: FormBuilder) {};

  details: any = [];
  row_kms: any = [];
  total_vines: any = [];
  row_numbers: any = [];

    profileForm = this.fb.group({
    taskName: ['', Validators.required],
    
      rates: this.fb.group({
      speed: ['', [Validators.min(1), Validators.max(20)]],
      resources: ['', [Validators.min(1), Validators.max(200)]]
    })
  });

  updateProfile() {
    this.profileForm.patchValue({
      taskName: 'Generic Task',
      rates: {
        speed: 7.5,
        resources: 8
      }
    });
  }

  onSubmit() {
    // Combine input data to create a group task that can then be imported into the calendar script.

    // Get row kms, turns and vines

    var row_kms = Number(this.calculations.reduce(function(accumulator, currentValue, currentIndex, array) {
      return accumulator + Number(currentValue['Row_KM']);
    },0));

    var row_numbers = this.calculations.reduce(function(accumulator, currentValue, currentIndex, array) {
      return accumulator + Number(currentValue['Row_Numbers']);
    },0);

    var total_vines = this.calculations.reduce(function(accumulator, currentValue, currentIndex, array) {
      return accumulator + Number(currentValue['Total_Vines']);
    },0);

    // Now calculate duration

    // Duration equals (distance/speed)/machines


    var speed  = Number(this.profileForm.value.rates.speed);
    var resources = Number(this.profileForm.value.rates.resources);

    console.warn(resources);

    var duration = (row_kms/speed)/resources;

    console.warn(this.calculations);

    this.details = [this.profileForm.value, this.allocatedTasks, duration, row_kms, row_numbers, total_vines];
    console.log(this.details);
    // Now want to post this data to the Tasks model in DB
    this.eventservice.postTaskData({
      "Tasks": this.details
      })
      .subscribe(
            res => {
              console.log("posted task");
            },
            err => {
              console.log("Error occured");
            }
      );
  }

       scheduledTasks:any = [];

    ngOnInit() {
      this.scheduledTasks = this.eventservice.getListData()
    .subscribe(
          res => {
            console.log(res)
            
            let arr = [];
            for (let prop in res){
              console.log(arr)
              arr.push(res[prop]);
            }
            
            console.log("find new listed jobs");
            this.scheduledTasks = arr;
            console.log(arr)
          },
          err => {
            console.log("Error occured in loading lists");
          }
        );
    }
  
    allocatedTasks = [];
    calculations = [];
  
    drop(event: CdkDragDrop<string[]>) {
      console.log(event);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
      this.allocatedTasks = event.container.data;
      console.log(this.allocatedTasks);
      // here we need to undertake the calculations before it is submitted to the calendar schedule
      this.calculations = this.allocatedTasks; // find or map or filter to get values for RowKMs and Row Numbers for turn time, make calculations and provide back to this.details!
    }
  }
  
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
    console.warn("Submitting data");
    this.details = [this.profileForm.value, this.allocatedTasks];
    console.log(this.details)
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
      // console.log(this.allocatedTasks.length>0)
    }
  }
  
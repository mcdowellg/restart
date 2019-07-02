  import {Component, OnInit } from '@angular/core';
  import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
  import { EventsService } from '../../events.service'
  
  /**
   * @title Drag&Drop connected sorting group
   */
  @Component({
    selector: 'app-block-drag',
    templateUrl: './block-drag.component.html',
    styleUrls: ['./block-drag.component.scss']
  })

  export class BlockDragComponent implements OnInit {

    constructor(private eventservice: EventsService) {};

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
      this.allocatedTasks = event.container.data
    }
  }
  

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatFormField, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-choose-people-machines',
  templateUrl: './choose-people-machines.component.html',
  styleUrls: ['./choose-people-machines.component.css']
})
export class ChoosePeopleMachinesComponent implements OnInit {

  people = ['🐼', '💪', '🐷', '🤖', '👽', '🐥'];
  chosenPerson: string;
  chosenMachine: [];

  constructor(public dialogRef: MatDialogRef<ChoosePeopleMachinesComponent>) { }

  confirmSelection() {
    // this.dialogRef.close(this.chosenPerson);
    this.dialogRef.close([this.chosenMachine, this.chosenPerson]);
  }

  ngOnInit() {
  }

}

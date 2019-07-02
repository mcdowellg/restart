import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})

export class TaskInputComponent {
  profileForm = this.fb.group({
    taskName: ['', Validators.required],
    
    rates: this.fb.group({
      speed: ['', [Validators.min(1), Validators.max(20)]],
      resources: ['', [Validators.min(1), Validators.max(200)]]
    })
  });

  constructor(private fb: FormBuilder) { }

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
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}

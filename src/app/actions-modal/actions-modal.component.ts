import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions-modal',
  templateUrl: './actions-modal.component.html',
  styleUrls: ['./actions-modal.component.scss'],
})
export class ActionsModalComponent implements OnInit {
  @Input() id: string = '';

  isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showActions(): void {
    this.isOpen = !this.isOpen;
  }

  clickEdit(): void {
    this.isOpen = false;
  }

  clickDelete(): void {
    this.isOpen = false;
  }
}

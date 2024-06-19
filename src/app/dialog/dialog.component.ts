import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input({required:true}) content!:string;
  @Output() close=new EventEmitter();
  closeDialog(){
    this.close.emit();
  }
}

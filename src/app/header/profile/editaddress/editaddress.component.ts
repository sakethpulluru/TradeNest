import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedDataService } from '../../../shared-data.service';
import { User } from '../../../datamodels';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from "../../../dialog/dialog.component";

@Component({
    selector: 'app-editaddress',
    standalone: true,
    templateUrl: './editaddress.component.html',
    styleUrl: './editaddress.component.css',
    imports: [FormsModule, DialogComponent,RouterModule]
})
export class EditAddressComponent implements OnInit {
  user!: User
  private sharedDatService=inject(SharedDataService);
  constructor(private router: Router) { }
  incorrectData=false;
  ngOnInit(): void {
    this.sharedDatService.getUser().subscribe(user => {
      if (user) {
        this.user = { ...user }; // Use spread operator to copy the user object
      }
    });
  }

  onSubmit(): void {
    if(this.user.address.address!="" && this.user.address.city!="" && this.user.address.state!="" && this.user.address.country!="" && this.user.address.postalCode!=""){
    this.sharedDatService.setUser(this.user);
  this.sharedDatService.setUser(this.user)
    console.log('Address updated:', this.user);
    this.router.navigate(['/profile']);
    }else{
      this.incorrectData=true;
    }
  }
  close(){
    this.incorrectData=false;
  }
}

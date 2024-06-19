import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedDataService } from '../../../shared-data.service';
import { User } from '../../../datamodels';
import { DialogComponent } from "../../../dialog/dialog.component";
@Component({
    selector: 'app-editprofile',
    standalone: true,
    templateUrl: './editprofile.component.html',
    styleUrl: './editprofile.component.css',
    imports: [NgIf, FormsModule, RouterModule, DialogComponent]
})
export class EditProfileComponent implements OnInit {
  user!:User;
  usernames="";
  password="";
  email="";
  incorrectData=false;
  constructor(
    private router: Router,
  ) { }

  private sharedDataService=inject(SharedDataService);
  ngOnInit(): void {
    this.sharedDataService.getUser().subscribe(user => {
      if (user) {
        this.user = { ...user }; // Use spread operator to copy the user object
      }
    });
  }

  onSubmit(): void {
    if(this.usernames!="" && this.password!="" && this.email!=""){
      this.user=User.fromJson(JSON.parse(localStorage.getItem("currentuser")||""))
      this.user.username=this.usernames;
      this.user.password=this.password;
      this.user.email=this.email;
      this.sharedDataService.setUser(this.user);
      console.log('Profile updated:', this.user);
      this.router.navigate(['/profile']);
      }
      else{
        this.incorrectData=true;
      }
  }
  close(){
    this.incorrectData=false;
  }
}

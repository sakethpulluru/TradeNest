import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VerificationserviceService } from './verificationservice.service';
import { NgIf } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms'
import { SharedDataService } from '../shared-data.service';
import { count } from 'rxjs';
import { User } from '../datamodels';
import { UsersService } from '../home/users.service';
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [RouterModule, NgIf, LoginComponent, FormsModule, DialogComponent]
})
export class SignupComponent {
  private shareddata = inject(SharedDataService);
  email: string = "";
  password: string = "";
  country: string = "";
  confPassword: string = "";
  streetAddress: string = "";
  city: string = "";
  statelive: string = "";
  postalcode: string = "";
  username: string = "";
  incorrectData = false;


  constructor(private VerificationserviceService: VerificationserviceService, private router: Router, private userservice: UsersService) { }

  // Verification methods for each field
  isEmailValid(email: string): boolean {
    return this.VerificationserviceService.verifyEmail(email);
  }

  isPasswordValid(password: string): boolean {
    return this.VerificationserviceService.verifyPassword(password);
  }
  async newSignUp() {
    this.shareddata.getUser().subscribe(user => {
      if (user) {
        this.router.navigate(['/home', user.username, user.id]);
      }
    });
    if (this.email != "" && this.password == this.confPassword && this.password != "" && this.streetAddress != "" && this.statelive != "" && this.postalcode != "" && this.country != "" && this.username) {
      try {
        const user = this.userservice.createUser(this.username, this.email, this.password, this.streetAddress, this.city, this.statelive, this.postalcode, this.country);
        this.shareddata.setUser(await user);
        this.router.navigate(['/home', (await user).username, (await user).id]);
      } catch (error) {
        console.log("cannot create user");
      }
    }else{
      this.incorrectData=true;
    }
  }
  close() {
    this.incorrectData = false;
  }
}

import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from "../dialog/dialog.component";
import { NgIf } from '@angular/common';
import { ProductService } from '../home/product.service.service';
import { UsersService } from '../home/users.service';
import { User } from '../datamodels';
import { SharedDataService } from '../shared-data.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RouterModule, FormsModule, DialogComponent, NgIf]
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.shareddata.getUser().subscribe((user: User | undefined) => {
      if (user) {
        this.router.navigate(['/home', user.username, user.id]);
      }
    });
  }
  constructor(private userService: UsersService, private router: Router) {}
  private shareddata=inject(SharedDataService);
  username = "";
  password = "";
  check = false;
  incorrectData = false;
  user!:User;
  @Output() successLogin=new EventEmitter<User>();
  async newLogin() {
    if (this.shareddata.isUserLogedin()){
      this.router.navigate(["/home"]);
    }
    if (this.username == "" || this.password == "") {
      this.incorrectData = true;
      return;
    }
    try {
      const userExists = await this.userService.doesUserExist(this.username, this.password);
      if (userExists) {
        const user = await this.userService.getUserData(this.username, this.password);
        this.username = "";
        this.password = "";
        if (user) {
          this.shareddata.setUser(user);
          localStorage.setItem("currentuser",JSON.stringify(user));
          console.log(user);
          this.incorrectData=true
          this.router.navigate(['/home',user.username,user.id]);
        }
      } else {
        this.incorrectData = false;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  close(){
    this.incorrectData=false;
  }
}

import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { User } from '../datamodels';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  currentUser:User|undefined;
  private userSubscription!: Subscription;

  constructor(private sharedData: SharedDataService, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.sharedData.getUser().subscribe(
      (user: User | undefined) => {
        if (user) {
          this.currentUser = user;
          this.isLoggedIn = true;
        } else {
          this.handleUserNotLoggedIn();
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.handleUserNotLoggedIn();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private handleUserNotLoggedIn(): void {
    const storedUser = localStorage.getItem('currentuser');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.logout(true);
      }
    } else {
      this.logout(true);
    }
  }

  logout(redirect: boolean = false): void {
    // Perform logout actions
    this.isLoggedIn = false;
    this.currentUser = undefined;
    localStorage.removeItem('currentuser');
      this.router.navigate(['/login']);
  }
}

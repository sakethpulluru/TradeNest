import { Component, OnInit, inject } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { User } from '../../datamodels';
import { Router, RouterModule } from '@angular/router';
import { DialogComponent } from "../../dialog/dialog.component";
import { JsonPipe, ɵDomAdapter } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [RouterModule, DialogComponent]
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private sharedData: SharedDataService, private router: Router) {}

  ngOnInit(): void {
    const storedUserString = localStorage.getItem('currentuser');
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      console.log('User fetched from localStorage:', storedUser);
      this.user = storedUser;
    } else {
      this.sharedData.getUser().subscribe(
        (user) => {
          if (user) {
            console.log('User fetched from service:', user);
            this.user = user;
          } else {
            console.error('User not found.');
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  errordata(data: string): string {
    return data;
  }
}

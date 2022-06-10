import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private router: Router, private api: UsersService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.api.checkLogin();
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/login');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  sideBarOpen = true;

  constructor(private bnIdle: BnNgIdleService, private router: Router) {

    // Idle for 1 minute
    this.bnIdle.startWatching(60).subscribe((res) => {
      if(res){
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }
    })

   }

  ngOnInit(): void {
  }

  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

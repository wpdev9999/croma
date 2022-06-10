import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'croma';

  constructor(private bnIdle: BnNgIdleService, private router: Router) { // initiate it in your component constructor
    this.bnIdle.startWatching(60).subscribe((res) => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
    })
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdleService } from './services/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'croma';

  constructor(private idle: IdleService, private router: Router) { // initiate it in your component constructor
    idle.idle$.subscribe(s => {
      console.log('im idle, zzz'),
      this.router.navigate(['/'])
    }
    );
    idle.wake$.subscribe(s => console.log('im awake!'));

  }


}

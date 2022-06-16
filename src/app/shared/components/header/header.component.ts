import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { usersLogin } from '../../../interfaces/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser = <usersLogin>{};
  loggedInUserName : string = '';
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user') || "");
    this.loggedInUserName = this.loggedInUser.name
  }
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    // setTimeout(() => {
    //   window.dispatchEvent(
    //     new Event('resize')
    //   );
    // }, 300);
    
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void{
    localStorage.removeItem('user');
  }

}

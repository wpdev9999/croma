import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private router: Router, private fb:FormBuilder, private api: UsersService, private toast: ToastrService) { 
    
  }
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.isLoggedIn = this.api.checkLogin();
    if(this.isLoggedIn){
      this.router.navigateByUrl('/admin');
    }
  }

  
  get l(): any { return this.loginForm.controls; }

  loginFormSubmit(){
      this.api.checkUser(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (res) => {
          if(res.length == 1){
            //console.log(res);          
              this.toast.success('Welcome bro ! '+res[0].name,'Success');
              this.router.navigateByUrl('/admin');
              localStorage.setItem('user', JSON.stringify(res[0]));
          }
          else{
            this.toast.error('Sorry, your data is not matched','Error!');  
          }
        },
        error: (err) => {
          //this.toast.
          this.toast.error(err.message, err.status);
        },
        complete: () =>{
          //this.toast.previousToastMessage.;
        }
      })
  }



}

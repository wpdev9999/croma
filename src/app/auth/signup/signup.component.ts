import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  actionBtn :string = "Sign Up";
  signUpData = {};

  constructor(private fb:FormBuilder, private api: UsersService, private toast: ToastrService, private router: Router) {   
  }

  newUserForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      suite: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]],
      }),
    }),
    phone: ['', [Validators.required]],
    website: ['', [Validators.required]],
    company: this.fb.group({
      name: ['', [Validators.required]],
      catchPhrase: ['', [Validators.required]],
      bs: ['', [Validators.required]]
    }),

  });
  

  get r(): any { return this.newUserForm.controls; }

  ngOnInit(): void {
  }

  signupFormSubmit(){

      if(this.newUserForm.valid){
        this.api.addUser(this.newUserForm.value).subscribe({
          next: (res:Users[]) => {
            this.toast.success('User : '+ this.newUserForm.value.name, 'Success');
            //console.log(res);
            // this.signUpData = {
            //   id:this.res.id,
            //   username:res.username,
            //   name:res.name,
            // };
            // this.router.navigate(['admin']);
            localStorage.setItem('user', JSON.stringify(this.signUpData));
            //console.log(JSON.stringify(res));
          },
          error: (err) => {
            this.toast.error(err.message, err.status);
          },
          complete: () =>{
            //this.toast.clear();
          }
        })
      } 
  
  }

}

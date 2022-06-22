import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  actionBtn: string = "Sign Up";
  data: any = null;
  signUpData: object = {};
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | null = null; // Variable to store file
  url: any = null; 

  constructor(private fb: FormBuilder, private api: UsersService, private toast: ToastrService, private router: Router) {
  }

  newUserForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    profile: [''],
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

  signupFormSubmit() {

    if (this.newUserForm.valid) {
      this.api.addUser(this.newUserForm.value).subscribe({
        next: (res) => {
          this.data = res;
          console.log(res);
          this.signUpData = { id: this.data.id, name: this.data.name, username: this.data.username };
          localStorage.setItem('user', JSON.stringify(this.signUpData));
          this.toast.success('User : ' + this.newUserForm.value.name, 'Success');
          if (this.signUpData) this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.toast.error(err.message, err.status);
        },
        complete: () => {
          //this.toast.clear();
        }
      })
    }

  }
  
   // On file Select
   onChange(event:any) {
    this.file = event.target.files[0];
    var reader = new FileReader();   
    reader.readAsDataURL(event.target.files[0]); 
    
    reader.onload = (e) =>  {
         //alert(reader.result);
         this.url = reader.result;
         Object.assign(this.newUserForm.value, {profile :reader.result})

        //chat box inputcode here
    }

  }

  // OnClick of button Upload
  // onUpload() {
    
  //   console.log(this.file);
  //   this.fileUploadService.upload(this.file).subscribe(
  //       (event: any) => {
  //           if (typeof (event) === 'object') {
  //               // Short link via api response
  //               this.shortLink = event.link;
  //               console.log(this.shortLink);
  //           }
  //       }
  //   );
  // }


}

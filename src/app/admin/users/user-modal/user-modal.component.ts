import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  //@Output() readonly addValue: EventEmitter<any> = new EventEmitter<any>();

  actionBtn :string = "Add User";
  
  constructor(private fb: FormBuilder, private api: UsersService,
    @Inject(MAT_DIALOG_DATA) public editData : Users,
    private dialogRef: MatDialogRef<UserModalComponent>,
    private toast: ToastrService
    ) {}

  newUserForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
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


  ngOnInit(): void {
     if(this.editData){
       this.actionBtn = "Update User";
       this.newUserForm.patchValue(this.editData);
     }
  }


  addUser(){

    if(!this.editData){
      if(this.newUserForm.valid){
        this.api.addUser(this.newUserForm.value).subscribe({
          next: (res:Users[]) => {
            //this.addValue.emit();
            this.dialogRef.close("save");
            this.toast.success('User : '+ this.newUserForm.value.name, 'Success');
            console.log(res);
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
    else{
      this.editUser();
    }
  }



  editUser(){
    if(this.newUserForm.valid){
      this.api.putUser(this.newUserForm.value, this.editData.id||0).subscribe({
        next: (res:Users[]) => {
          this.dialogRef.close("update");
          this.toast.success('User : '+ this.newUserForm.value.name, 'Updated');
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

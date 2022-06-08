import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']  
})
export class UsersComponent implements OnInit  {

  listData!: MatTableDataSource<any>
  public displayedColumns : string [] = ['name', 'username', 'email', 'action'];
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private api: UsersService, public dialog: MatDialog, private toast: ToastrService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  refreshTable(){
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  getAllUser(){
    
    this.api.getAll().subscribe({
      next: (res:Users[]) => {
        this.listData = new MatTableDataSource(res);
        this.refreshTable();        
        //this.toast.success('Fetched Users', 'Success');
      },
      error: (err) => {
        this.toast.error(err.message, err.status);
      },
      complete: () =>{
        //this.toast.clear();
      }
    })
  }

  addUserModal(){
    const dialogRef = this.dialog.open(UserModalComponent).afterClosed().subscribe( val => {
      if(val === 'save'){
        this.getAllUser();
      }
    });
    // dialogRef.componentInstance.addValue.subscribe(() =>
    //  {
    //   this.getAllUser();
    // })
  }

  editUser(element : Users){
    const dialogRef = this.dialog.open(UserModalComponent, {
      data:element 
    }).afterClosed().subscribe( val => {
      if(val === 'update'){
        this.getAllUser();
      }
    });
  }

  delete(element : Users){
    let confirm = window.confirm('Are you sure you want delete this record: ' + element.name);
    
    if(confirm){
        this.api.deleteUser(element.id||0).subscribe({
          next: (res:Users[]) => {
            this.toast.success('User : '+ element.name, 'Deleted');
            this.getAllUser();
          },
          error: (err) => {
            this.toast.error(err.message, err.status);
          },
          complete: () =>{
            // After complete process
          }
        })
    }
  }




}

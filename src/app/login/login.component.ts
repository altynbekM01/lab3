import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }


  ngOnInit(): void {
  }
  user ={username:'',password:'', remember :false};

  onSubmit(){
    console.log('User:',this.user);
    this.dialogRef.close();
  }



}

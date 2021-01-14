import { Component, OnInit,Inject} from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent implements OnInit {
  emailForm: FormGroup;
  constructor(private cookieService: CookieService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<EmailDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData:any) { }
  ngOnInit(){
    this.emailForm = this.formBuilder.group({
      name: [''],
      emailFormControl: ['', [Validators.required,Validators.email]],
      comment:['']
    });
  }
  onSubmit(){
    const formValue = this.emailForm.value;
    let array = this.dialogData.displayArray;
    if(this.emailForm.valid){
      for(let i=0;i<array.length;i++ ){
        if(formValue.name != array[i].name && formValue.emailFormControl != array[i].email){
          this.cookieService.set( 'name',  formValue.name);
          this.cookieService.set( 'email',  formValue.emailFormControl);
        }
      }
     this.dialogRef.close({comment:formValue.comment});
    }
    else{
      alert("Please enter details")
    }

  }
}

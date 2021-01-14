import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../common.service';
import {MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmailDialogComponent } from '../email-dialog/email-dialog.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  obs: Observable<any>;
  displayarray = [];
  isLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showContentFlag:boolean = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(public dialog: MatDialog,private commonService: CommonService) { }

  ngOnInit() {
    this.isLoading =true;
    this.displayData();

  }
  displayData() {
    this.commonService.getPostsData().subscribe((response) => {
      if (response) {
        console.log(response);
        this.isLoading =false;
        this.displayResponseData(response);
      }
      else {
        alert("Response Failed");
      }

    });
  }
  displayResponseData(resp){

    let userarray = resp[0].data;
    let commentarray = resp[1].data;
    let postarray = resp[2].data;
    for (let i = 0; i < userarray.length; i++) {
      for (let j = 0; j < commentarray.length; j++) {
        for (let k = 0; k < postarray.length; k++) {
          if(userarray[i].id === postarray[k].id && userarray[i].id === commentarray[j].id){
            this.displayarray.push({
              title: postarray[k].title,
              name: userarray[i].name,
              body:postarray[k].body,
              comments : commentarray[j].body,
              showContent:false,
              email:userarray[i].email
            });
          }

        }
      }
    }
    console.log(this.displayarray);
    this.dataSource = new MatTableDataSource(this.displayarray);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
  add(index){
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EmailDialogComponent,{
      width: '500px',
      height: '500px',
      data: {displayArray: this.displayarray}
    }
);


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        for(let i=0;i<this.displayarray.length;i++){
          if(index === i){
            this.displayarray[i].comments = result.comment;
          }
        }
      }

    });
  }
  showContent(index){
    for(let i=0;i<this.displayarray.length;i++){
      if(index === i){
        this.displayarray[i].showContent = true;
      }
    }
  }
}

import { forEach } from '@angular/router/src/utils/collection';
import { ArrayType } from '@angular/compiler/public_api';
import { EMPTY_ARRAY } from '@angular/core/src/render3/definition';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule,NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit{
  title = 'LoadingTest';
  Users:any;
  PageNumbers: Array<number> = [];
  pageCount:number;
  CurrentPage:number;
constructor(private spinner: NgxSpinnerService,private http: HttpClient) { }
 
  ngOnInit() {
   
 this.http.get('https://reqres.in/api/unknown').subscribe(data => {
      console.log(data);
      this.Users=data["data"];
      this.CurrentPage=data["page"];
      this.pageCount=data["total_pages"];
      for(var i=0;i<this.pageCount;i++){
        this.PageNumbers.push(i+1);
      }
    });
   // GetUserData(1)
  }
  GetUserData(sPageNumber){
    var sParam='';
    this.CurrentPage=sPageNumber;
    if(sPageNumber)sParam='/'+sPageNumber;
    this.http.get('https://reqres.in/api/unknown').subscribe(data => {
      console.log(data);
      this.Users=data["data"];
    
     
     
    });
  }

}

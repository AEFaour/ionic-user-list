import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API_URL = 'https://randomuser.me/api?results=10';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  public userList = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(API_URL).subscribe(
      (response: any) => {
        console.log(response);
        this.userList = response.results;

      }
    );
  }
  loadMoreUsers(even) {
    this.http.get(API_URL).subscribe(
      (response: any) => {
        this.userList = this.userList.concat(response.results);
        even.target.complete();
      }
    );
  }

}

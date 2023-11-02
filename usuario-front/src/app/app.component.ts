import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  login: boolean = false;

  constructor() {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      this.login = true;
    }
  }

  isLogin(login: boolean) {
    this.login = login;
  }


}

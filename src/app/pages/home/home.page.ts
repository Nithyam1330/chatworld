import { LOCAL_STORAGE_ENUMS } from './../../shared/constants/localstorage.enums';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { QueryValueType } from '@angular/compiler/src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usersList: any;
  now: Date = new Date();
  constructor(
    private api: ApiService,
    private router: Router
  ) {
    this.getUsersList();
  }

  ngOnInit() {
    console.log('home user', this.api.user);
  }

  logout() {
    this.api.signOut();
  }

  getUsersList() {
    this.api.db.collection('users')
      .onSnapshot((querySnapshot) => {
        this.usersList = [];
        console.log('userlist query', querySnapshot);
        querySnapshot.forEach((doc) => {
          const loggedInUser = localStorage.getItem(LOCAL_STORAGE_ENUMS.loggedInID);
          if (doc.data().id !== loggedInUser) {
            this.usersList.push(doc.data());
          }
        });
      });
  }

  openChat(user: any) {
    this.router.navigate(['/chat-room'], {
      queryParams: {
        recieverID: user.id,
        name: user.name
      },
      skipLocationChange: false
    });
  }

}

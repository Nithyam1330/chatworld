import { AddUserPage } from './../add-user/add-user.page';
import { LOCAL_STORAGE_ENUMS } from './../../shared/constants/localstorage.enums';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';
import { QueryValueType } from '@angular/compiler/src/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usersList: any;
  now: Date = new Date();
  loggedInUser: any;
  userSubscription: any;
  loggedInUserSubscription: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.getUsersList();
  }

  ionViewDidLoad() {
  }

  logout() {
    this.api.signOut();
  }

  getUsersList() {
    this.userSubscription = this.api.db.collection('users')
      .onSnapshot((querySnapshot) => {
        this.usersList = [];
        const tempUserList = [];
        const loggedInUser = localStorage.getItem(LOCAL_STORAGE_ENUMS.loggedInID);
        querySnapshot.forEach((doc) => {
          if (doc.data().id !== loggedInUser) {
            tempUserList.push(doc.data());
          } else {
            this.loggedInUser = doc.data();
          }
        });
        this.loggedInUserSubscription = this.api.db.collection(loggedInUser)
          .onSnapshot((userSpecificChatList) => {
            if (userSpecificChatList['docs'] && userSpecificChatList['docs'].length) {
              userSpecificChatList.forEach((doc) => {
                const recieverID = doc.data().recieverID;
                const index = tempUserList.findIndex(obj => obj.id === recieverID);
                const alreadyPushedIndex = this.usersList.findIndex(obj => obj.id === recieverID);
                if (index !== -1 && alreadyPushedIndex === -1) {
                  this.usersList.push(tempUserList[index]);
                }
              });
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


  async addUserModal() {
    const modal = await this.modalController.create({
      component: AddUserPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  ionViewWillLeave() {
    this.loggedInUserSubscription();
    this.userSubscription();
  }
}

import { Router } from '@angular/router';
import { LOCAL_STORAGE_ENUMS } from './../../shared/constants/localstorage.enums';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  searchByUserId = '';
  searchList = [];
  constructor(
    private api: ApiService,
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  close() {
    this.modalController.dismiss();
  }

  seachUserListById() {
    console.log('entered');
    this.api.db.collection('users')
      .where('id', '>=', this.searchByUserId).where('id', '<=', this.searchByUserId + '\uf8ff')
      .onSnapshot((querySnapshot) => {
        this.searchList = [];
        const loggedInUser = localStorage.getItem(LOCAL_STORAGE_ENUMS.loggedInID);
        if (querySnapshot['docs'].length > 0) {
          querySnapshot.forEach((doc) => {
            if (doc.data().id !== loggedInUser) {
              this.searchList.push(doc.data());
            }
          });
        } else {
          this.presentAlert();
        }
        console.log(this.searchList);
        this.searchByUserId = '';
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'User Does not exist with this ID',
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToSelectedUser(user) {
    console.log(user);
    this.router.navigate(['/chat-room'], {
      queryParams: {
        recieverID: user.id,
        name: user.name
      },
      skipLocationChange: false
    }).then(res => {
      this.close();
    });
  }

}

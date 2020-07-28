import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

const config = {
  apiKey: 'AIzaSyDAsAsO-C_QctJe4aH37-E4fOaKdpN5bik',
  authDomain: 'chatapp-a64cb.firebaseapp.com',
  databaseURL: 'https://chatapp-a64cb.firebaseio.com',
  projectId: 'chatapp-a64cb',
  storageBucket: 'chatapp-a64cb.appspot.com',
  messagingSenderId: '639600483685'
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loader: boolean = false;
  user: any;
  db: any;
  admin: boolean = false;

  constructor(
    private snack: SnackbarService,
    private router: Router
  ) {

  }

  configApp() {
    firebase.initializeApp(config);
    this.db = firebase.firestore();
  }

  signin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.loader = false;

        this.user = {
          id: email.substring(0, email.indexOf('@')).toLowerCase()
        };

        localStorage.setItem('loggedIn', this.user.id);
        this.router.navigate(['home']);
        console.log('login', user);
      })
      .catch((error) => {
        this.loader = false;
        console.log('error while signin', error);
        this.snack.openSnackBar(error.message, 'ok');
      });
  }

  signUp(name: string, email: string, password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.loader = false;

        this.user = {
          name: name,
          id: email.substring(0, email.indexOf('@')).toLowerCase()
        };
        localStorage.setItem('loggedIn', this.user.id);

        // create user list on firebase
        this.db.collection('users').doc(this.user.id).set({
          name: name,
          id: this.user.id
        });

        this.router.navigate(['/home']);
        console.log('register', user);
      })
      .catch((error) => {
        this.loader = false;
        console.log('error while signup', error);
        this.snack.openSnackBar(error.message, 'ok');
      });
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.user = {};
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/login'], { skipLocationChange: false });

    }).catch((error) => {
      console.log('error while logout', error);
    });

  }

  sendMsg(senderIDInput, recieverIDInput, message) {
    const keyInput = this.generateRandomString(16);
    this.db.collection(senderIDInput).doc(keyInput).set({
      senderID: senderIDInput,
      recieverID: recieverIDInput,
      msg: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      key: keyInput
    });

  }

  generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  formatAMPM(date) {
    if (date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      const strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    } else {
      return '';
    }

  }
}

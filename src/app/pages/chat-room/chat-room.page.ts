import { LOCAL_STORAGE_ENUMS } from './../../shared/constants/localstorage.enums';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { ThrowStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {
  message = '';
  senderUnsubscribe: Subscription;
  reciverUnsubscribe: Subscription;
  messages: any = [];
  loader = true;
  recieverID = '';
  senderID = '';
  recieverName = '';
  @ViewChild('scrollMe', { static: true }) private myScrollContainer;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.recieverID = this.activatedRoute.snapshot.queryParams.recieverID;
    this.recieverName = this.activatedRoute.snapshot.queryParams.name;
    this.senderID = localStorage.getItem(LOCAL_STORAGE_ENUMS.loggedInID);
    if (this.recieverID && this.senderID) {
      this.getChat();
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.scrollToBottom(1000);
    } catch (err) { }
  }

  goBack() {
    this.router.navigate(['home'], { skipLocationChange: false });
  }

  logout() {
    console.log('lgout');
    this.api.signOut();
  }

  sendChat() {
    if (this.message !== '') {
      this.api.sendMsg(this.senderID, this.recieverID, this.message);
    }
    this.message = '';
  }

  getChat() {
    this.senderUnsubscribe = this.api.db.collection(this.senderID)
      .where('recieverID', '==', this.recieverID)
      .onSnapshot((senderSnap) => {
        this.loader = false;
        this.reciverUnsubscribe = this.api.db.collection(this.recieverID)
          .where('recieverID', '==', this.senderID)
          .onSnapshot((reciverSnap) => {
            this.messages = [];
            const senderMessages = [];
            const recieverMessages = [];
            senderSnap.forEach((doc) => {
              const data = doc.data();
              senderMessages.push(data);
            });
            reciverSnap.forEach((doc) => {
              const data = doc.data();
              recieverMessages.push(data);
            });
            this.messages = senderMessages.concat(recieverMessages);
            this.messages.sort(this.sortDate);
            this.scrollToBottom();
          });
      });
  }

  sortDate(a, b) {
    if (a.timestamp && b.timestamp) {
      const dateA = new Date(a.timestamp.toDate());
      const dateB = new Date(b.timestamp.toDate());
      return dateA > dateB ? 1 : -1;
    } else {
      return -1;
    }
  }


  ionViewWillLeave() {
    try {
      this.senderUnsubscribe.unsubscribe();
      this.reciverUnsubscribe.unsubscribe();
    } catch (e) {
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/authentication.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub!: Subscription;
  isUserAuthenticated = false;

  constructor(private dbService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      userData => {
        this.isUserAuthenticated = !!userData;
      }
    );
  }

  onSave() {
    this.dbService.storeData();
  }

  onFetch() {
    this.dbService.fetchData().subscribe();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

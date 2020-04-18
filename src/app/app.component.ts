import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { SettingService } from './_services/settings.service';

@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['app.component.scss']})
export class AppComponent {
    currentUser: User;    
  isCollapsed = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,      public settingService: SettingService,
    ) {
        this.authenticationService.currentUser.subscribe(x => {this.currentUser = x; 
            console.log(this.currentUser)});
            this.settingService.setupLanguage();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    public login(){   this.router.navigate(['/login']);}
}
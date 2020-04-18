import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class SettingService{
    constructor(public translateService: TranslateService,
        public cookieService: CookieService ){}
    public setupLanguage(){
        this.translateService.addLangs(['en', 'ru']);
        this.translateService.setDefaultLang('ru');
        let presetLanguage = this.cookieService.get('lang');

        if (typeof presetLanguage === 'string' && presetLanguage.match(/en|ru/))
            this.translateService.use(presetLanguage);
        else
            this.translateService.use(this.translateService.getDefaultLang());
    }

}
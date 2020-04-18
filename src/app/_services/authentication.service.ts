import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User, AuthProviderDto } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    apiurl = 'http://localhost:50686';
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiurl}/account/Login`, { Email: username, Password: password })
            .pipe(map(user => {
                console.log(user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
             
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    externalLoginCallback(returnUrl: string, error: string){
        let params = new HttpParams().set("returnUrl", returnUrl).set("remoteError", error);
        return this.http.get<any>(`${this.apiurl}/account/ExternalLoginCallback`, {params: params});
        
    }

    register(Email: string, Password: string) {
        return this.http.post<any>(`${this.apiurl}/account/register`, { Password : Password, Email : Email })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }



    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, ObjectUnsubscribedError, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // tempUser: User = new User(null, undefined, undefined, undefined);
    user = new BehaviorSubject<User | null>(null);
    private expirationTime: any;
    
    constructor(private http: HttpClient, private router: Router) {}
    
    signUp(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbqVyE37vzs-zOm0WoUx_4_2Qj9qm-rWA', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError), tap(
            resData => {
                this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }
        ));
    }

    signIn(email: string, password: string) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbqVyE37vzs-zOm0WoUx_4_2Qj9qm-rWA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(
            resData => {
                this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }
        ));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _expirationDate: string
        } = JSON.parse(localStorage.getItem('userData')!);
        if(!userData) {
            return;
        }
        const user = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate));
        if(user.token) {
            this.user.next(user);
            const expireDur: number = new Date(userData._expirationDate).getTime() - new Date().getTime();
            this.autoLogout(expireDur); 
        }
    }

    logOut() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.expirationTime) {
            clearTimeout(this.expirationTime);
        }
        this.expirationTime = null;
        this.router.navigate(['/auth']);
    }

    autoLogout(expirationTime: number) {
        this.expirationTime = setTimeout(() => {
            this.logOut();
        }, expirationTime);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errMsg = 'An Unknown error has occured!'
            if(!errorRes.error || !errorRes.error.error) {
                return throwError(errMsg);
            }
            switch(errorRes.error.error.message) {
                case 'INVALID_PASSWORD': errMsg = 'Wrong Password!';
                break;
                case 'EMAIL_EXISTS': errMsg = 'Email already exists!';
                break;
                case 'USER_DISABLED': errMsg = 'User Disabled!';
                break;
            }
            return throwError(errMsg);
    }

    private handleUser(email: string, id: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);
    }
}
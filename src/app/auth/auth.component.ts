import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "./authentication.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error = null;

    constructor(private authService: AuthService, private router: Router) {}

    changeMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authform: NgForm) {
        const email = authform.value.email;
        const password = authform.value.password;
        this.isLoading = true;
        let authObserve: Observable<AuthResponse>;
        if(this.isLoginMode) {
            authObserve = this.authService.signIn(email, password);
        } else {
            authObserve = this.authService.signUp(email, password);
        }
        authObserve.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errMsg => {
                console.log(errMsg);
                (<any>this.error) = errMsg;
                this.isLoading = false;
            }
        )
        authform.reset();
    }

    closeModal() {
        this.error = null;
    }
}
import { Component, ElementRef, ViewChild } from '@angular/core'
import { LoginService } from './login.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    })
    constructor(private loginService: LoginService) {}

    login() {
        this.loginService.loginUser(
            this.loginForm.controls.email.value!,
            this.loginForm.controls.password.value!
        )
    }
}

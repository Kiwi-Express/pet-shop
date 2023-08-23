import { Component, OnInit } from '@angular/core'
import { ProfileService } from './profile.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from '../users/users.component'
import { LoginService } from '../login/login.service'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profile = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
    })

    constructor(
        private profileService: ProfileService,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.prefillForm()
    }

    prefillForm() {
        const userEmail = this.loginService.getLoggedInUserEmail()
        this.profileService.getUser(userEmail).subscribe((user) => {
            if (!user) {
                alert('The user with the given email does not exist!')
                return
            }

            this.profile.controls.firstName.setValue(user.firstName)
            this.profile.controls.lastName.setValue(user.lastName)
        })
    }

    onSubmit() {
        if (!this.profile.valid) {
            alert('Please make sure you fill out all the fields')
            return
        }

        const user: User = {
            id: this.loginService.getLoggedInUserId(),
            firstName: this.profile.controls.firstName.value!,
            lastName: this.profile.controls.lastName.value!,
        }

        this.profileService.update(user).subscribe((result: any) => {
            if (result.status === 'ERR') return
            this.prefillForm()
        })
    }
}

import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProfileService } from '../profile/profile.service'
import { User } from '../users/users.component'
import { Router } from '@angular/router'

@Component({
    selector: 'app-create-acc',
    templateUrl: './create-acc.component.html',
    styleUrls: ['./create-acc.component.scss'],
})
export class CreateAccComponent {
    createAccForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
    })

    constructor(
        private profileService: ProfileService,
        private router: Router
    ) {}

    onSubmit() {
        if (!this.createAccForm.valid) {
            alert('Please make sure you fill out all the fields correctly')
            return
        }

        if (
            this.createAccForm.controls.password.value !==
            this.createAccForm.controls.confirmPassword.value
        ) {
            alert('Your passwords do not match')
            return
        }

        const user: User = {
            firstName: this.createAccForm.controls.firstName.value!,
            lastName: this.createAccForm.controls.lastName.value!,
            email: this.createAccForm.controls.email.value!,
            password: this.createAccForm.controls.password.value!,
        }

        this.profileService.create(user).subscribe((result: any) => {
            if (result === 'ERR') return

            this.router.navigate(['/login'])
        })
    }
}

import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from './login/login.service'

export const authGuard = () => {
    const loginService = inject(LoginService)
    const router = inject(Router)

    if (loginService.isUserLoggedIn()) {
        return true
    }

    return router.navigate(['/login'])
}

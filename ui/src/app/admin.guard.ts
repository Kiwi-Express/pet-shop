import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from './login/login.service'

export const adminGuard = () => {
    const loginService = inject(LoginService)
    const router = inject(Router)

    if (loginService.isUserAdmin()) {
        return true
    }

    return router.navigate(['/home', 'categories'])
}

import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { BASE_URL } from '../constants'
import { getDecodedToken } from '../utils'

@Injectable()
export class LoginService {
    userLogin: EventEmitter<null> = new EventEmitter<null>()
    userLogout: EventEmitter<null> = new EventEmitter<null>()

    constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string) {
        return this.http.post(BASE_URL + 'auth/login', {
            email,
            password,
        })
    }

    loginUser(email: string, password: string) {
        this.login(email, password).subscribe((res: any) => {
            if (res.status !== 'ERR') {
                localStorage.setItem('token', res.token)
                this.userLogin.emit()
                this.router.navigate(['/home', 'categories'])
            } else {
                console.error(res.message)
            }
        })
    }

    logout() {
        localStorage.removeItem('token')
        this.userLogout.emit()
        this.router.navigate(['/login'])
    }

    isUserLoggedIn() {
        if (localStorage.getItem('token')) {
            return true
        } else {
            return false
        }
    }

    isUserAdmin() {
        const token = getDecodedToken()
        return (
            this.isUserLoggedIn() &&
            (token ? Number(token.access) === 1 : false)
        )
    }

    getUserAccess() {
        const token = getDecodedToken()
        return token ? Number(token.access) : 0
    }

    getLoggedInUserEmail() {
        const token = getDecodedToken()
        return token ? token.email : ''
    }

    getLoggedInUserId() {
        const token = getDecodedToken()
        return token ? token.id : 0
    }
}

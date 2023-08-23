import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../constants'
import { User } from '../users/users.component'

@Injectable()
export class ProfileService {
    constructor(private http: HttpClient) {}



    getUser(email: string) {
        return this.http.get<User>(BASE_URL + 'users/' + email)
    }

    create(user: User) {
        return this.http.post(BASE_URL + 'auth/register', user)
    }

    update(user: User) {
        return this.http.put(BASE_URL + 'users/' + user.id, user)
    }
}

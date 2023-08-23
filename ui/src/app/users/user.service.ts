import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../constants'
import { User } from '../users/users.component'

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get<User[]>(BASE_URL + 'users')
    }

    deleteUser(id: number) {
        return this.http.delete(BASE_URL + 'users/' + id)
    }
}

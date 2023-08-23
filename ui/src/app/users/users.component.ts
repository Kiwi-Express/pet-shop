import { Component, Injectable, OnInit } from '@angular/core'
import { UserService } from './user.service'
import { Router } from '@angular/router'

export type User = {
    id?: number
    firstName: string
    lastName: string
    email?: string
    password?: string
}
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: User[] = []
    dataSourse = this.users
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'remove']

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.getUsers()
    }

    getUsers() {
        this.userService.getUsers().subscribe((result) => {
            this.users = result
        })
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id).subscribe((result: any) => {
            if (result.status === 'ERR') return
            this.getUsers()
        })
    }
}

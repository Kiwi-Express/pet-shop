import { Component, OnInit } from '@angular/core'
import { LoginService } from '../login/login.service'

type MenuLink = {
    label: string
    href: string
    access: number
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    private menuLinks: MenuLink[] = [
        { label: 'Login', href: '/login', access: 0 },
        { label: 'Create Account', href: '/create-acc', access: 0 },
        { label: 'Categories', href: '/home/categories', access: -1 },
        { label: 'Profile', href: 'profile', access: 2 },
        { label: 'Cart', href: '/home/cart', access: 2 },
        { label: 'Receipts', href: '/purchases', access: 2 },
        { label: 'Create Product', href: '/admin/new-product', access: 1 },
        { label: 'Users', href: '/admin/users', access: 1 },
    ]

    displayedLinks: MenuLink[] = []
    isLoggedIn = false

    constructor(private loginService: LoginService) {}

    ngOnInit(): void {
        this.isLoggedIn = this.loginService.isUserLoggedIn()
        this.filterLinks()
        this.loginService.userLogin.subscribe(() => {
            this.filterLinks()
            this.isLoggedIn = true
        })
        this.loginService.userLogout.subscribe(() => {
            this.isLoggedIn = false
            this.filterLinks()
        })
    }

    filterLinks() {
        this.displayedLinks = this.menuLinks.filter(
            (link) =>
                link.access === -1 ||
                link.access === this.loginService.getUserAccess()
        )
    }

    logout() {
        this.loginService.logout()
    }
}

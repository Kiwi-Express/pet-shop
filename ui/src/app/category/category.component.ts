import { Component, OnInit } from '@angular/core'
import { Category, ShopService } from '../shop/shop.service'
import { Router } from '@angular/router'
import { LoginService } from '../login/login.service'

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
    categories: Category[] = []
    isAdmin = false

    constructor(
        private shopService: ShopService,
        private router: Router,
        private loginService: LoginService
    ) {}

    ngOnInit(): void {
        this.shopService
            .getCategories()
            .subscribe((result) => (this.categories = result))
        this.isAdmin = this.loginService.isUserAdmin()
    }
    createCategory() {
        this.router.navigate(['/admin', 'create-category'])
    }
    editCategory(id: number) {
        this.router.navigate(['/admin', 'categories', id])
    }
}

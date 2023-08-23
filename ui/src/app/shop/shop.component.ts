import { Component, OnInit } from '@angular/core'
import { ShopProduct, ShopService } from './shop.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CartService } from '../cart/cart.service'
import { LoginService } from '../login/login.service'

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
    products: ShopProduct[] = []
    displayedColumns: string[] = [
        'name',
        'desc',
        'price',
        'cart',
        'edit',
        'back',
    ]
    isAdmin = false

    constructor(
        private loginService: LoginService,
        private shopService: ShopService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.shopService
            .getProducts(this.route.snapshot.paramMap.get('id')!)
            .subscribe((result) => {
                this.products = result
            })
        this.isAdmin = this.loginService.isUserAdmin()
    }

    addToCart(product: ShopProduct) {
        if (!this.loginService.isUserLoggedIn()) {
            this.router.navigate(['/login'])
        }
        this.cartService.addProduct(product)
    }

    editProduct(id: number) {
        this.router.navigate(['/admin', 'product', id])
    }
    returnToCategories() {
        this.router.navigate(['/home', 'categories'])
    }
}

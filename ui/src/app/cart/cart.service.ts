import { Injectable } from '@angular/core'
import { ShopProduct } from '../shop/shop.service'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../constants'
import { LoginService } from '../login/login.service'

export type CartProduct = ShopProduct & {
    qty: number
    qtyPrice?: number
}

type Purchase = {
    items: CartProduct[]
    address: string
    city: string
    zip: string
    userId: number
}

@Injectable()
export class CartService {
    products: CartProduct[] = []
    constructor(private http: HttpClient, private loginService: LoginService) {}

    getCart() {
        return this.products
    }

    addProduct(product: ShopProduct) {
        const existingProduct = this.products.find(
            (element) => element.id === product.id
        )

        if (existingProduct) {
            existingProduct.qty++
            existingProduct.qtyPrice! += product.price
        } else {
            this.products.push({ ...product, qty: 1, qtyPrice: product.price })
        }
    }

    removeProduct(id: number) {
        const index = this.products.findIndex((element) => element.id === id)
        this.products.splice(index, 1)
    }

    checkout(address: string, city: string, zip: string) {
        const purchase: Purchase = {
            address,
            city,
            zip,
            userId: this.loginService.getLoggedInUserId(),
            items: this.products,
        }
        
        return this.http.post(BASE_URL + 'checkout/', purchase)
    }
}

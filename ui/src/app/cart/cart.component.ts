import { Component, OnInit } from '@angular/core'
import { CartProduct, CartService } from './cart.service'
import { ShopProduct, ShopService } from '../shop/shop.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
    export class CartComponent implements OnInit {
        displayedColumns: string[] = [
            'name',
            'desc',
            'price',
            'qty',
            'qty-price',
            'cart',
        ]
        cart: CartProduct[] = []
        
        checkOutForm = new FormGroup({
            address: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            zip: new FormControl('', [Validators.required]),
        })
        constructor(public cartService: CartService, private router: Router) {}
        
        ngOnInit(): void {
            this.cart = this.cartService.getCart()
        }
        
        removeProduct(id: number) {
            this.cartService.removeProduct(id)
            this.cart = [...this.cartService.getCart()]
        }
        
        checkout() {
            if (!this.checkOutForm.valid) {
                alert('Please fill out the form')
                return;
            }

            this.cartService.checkout(this.checkOutForm.controls.address.value!, this.checkOutForm.controls.city.value!, this.checkOutForm.controls.zip.value!).subscribe((result: any) => {
                if (result.status === "ERR") return;

                this.router.navigate(['/purchases'])
            })
        }
    }
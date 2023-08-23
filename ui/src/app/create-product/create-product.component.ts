import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Category, ShopProduct, ShopService } from '../shop/shop.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
    id: number = NaN
    categories: Category[] = []
    newProductForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        desc: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
        ]),
        price: new FormControl(0, [Validators.required, Validators.min(1)]),
        category: new FormControl('', [Validators.required]),
    })

    constructor(
        private shopService: ShopService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.shopService.getCategories().subscribe((categories) => {
            this.categories = categories
            this.id = Number(this.route.snapshot.params['id'])

            if (this.idExists()) {
                this.shopService.getProduct(this.id).subscribe((product) => {
                    // Execute if we don't find a valid product
                    if (!product) {
                        alert(`No product with id ${this.id}`)
                        this.router.navigate(['/admin', 'new-product'])
                        return
                    }

                    this.newProductForm.controls.name.setValue(product!.name)
                    this.newProductForm.controls.desc.setValue(product!.desc)
                    this.newProductForm.controls.price.setValue(product!.price)
                    this.newProductForm.controls.category.setValue(
                        product!.categoryId
                    )
                })
            } else {
                this.router.navigate(['/admin', 'new-product'])
            }
        })
    }

    onSubmit() {
        if (!this.newProductForm.valid) {
            alert('Please fill out all the fields')
            return
        }

        const product: ShopProduct = {
            name: this.newProductForm.controls.name.value!,
            categoryId: this.newProductForm.controls.category.value!,
            desc: this.newProductForm.controls.desc.value!,
            price: this.newProductForm.controls.price.value!,
        }

        if (this.idExists()) {
            this.shopService
                .editProduct({ ...product, id: this.id })
                .subscribe((result: any) => {
                    if (result.status === 'ERR') return
                    this.router.navigate(['..'])
                })
        } else {
            this.shopService.addProduct(product).subscribe((result: any) => {
                if (result.status === 'ERR') return
                this.router.navigate(['..'])
            })
        }
    }

    deleteProduct() {
        this.shopService.delete(this.id).subscribe((res) => {
            this.router.navigate(['/home', 'categories'])
        })
    }

    idExists() {
        return !isNaN(this.id)
    }
}

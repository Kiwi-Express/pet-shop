import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Category, ShopService } from '../shop/shop.service'
import { ActivatedRoute, Router } from '@angular/router'


@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
    id: number = NaN
    categories: Category[] = []
    newCategoryForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        imgUrl: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
        ]),
    })
    constructor(
        private shopService: ShopService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id'])
        if (this.idExists()) {
            this.shopService.getCategory(this.id).subscribe((category) => {
                // Execute if we don't find a valid Category
                if (!category) {
                    alert(`No Category with id ${this.id}`)
                    this.router.navigate(['/admin', 'create-category'])
                    return
                }

                this.newCategoryForm.controls.name.setValue(category!.name)
                this.newCategoryForm.controls.imgUrl.setValue(category!.imgUrl)
            })
        } else {
            this.router.navigate(['/admin', 'categories/:id'])
        }
    }
    onSubmit() {
        if (!this.newCategoryForm.valid) {
            alert('Please fill out all the fields')
            return
        }

        const category: Category = {
            name: this.newCategoryForm.controls.name.value!,
            imgUrl: this.newCategoryForm.controls.imgUrl.value!,
        }

        if (this.idExists()) {
            this.shopService
                .editCategory({ ...category, id: this.id })
                .subscribe((result: any) => {
                    if (result.status === 'ERR') return
                    this.router.navigate(['..'])
                })
        } else {
            this.shopService.addCategory(category).subscribe((result: any) => {
                if (result.status === 'ERR') return
                this.router.navigate(['..'])
            })
        }
    }
    deleteCategory() {
        this.shopService.deleteCategory(this.id).subscribe((result: any) => {
            if (result.status === 'ERR') return
            this.router.navigate(['/home', 'categories'])
        })
    }
    idExists() {
        return !isNaN(this.id)
    }
}

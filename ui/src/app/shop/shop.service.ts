import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../constants'

export type ShopProduct = {
    id?: number
    name: string
    desc: string
    price: number
    categoryId: string
}
export type Category = {
    id?: number
    name: string
    imgUrl: string
}

@Injectable()
export class ShopService {
    products: ShopProduct[] = []
    constructor(private http: HttpClient) {}
    getProducts(categoryId: string) {
        return this.http.get<ShopProduct[]>(
            BASE_URL + 'categories/' + categoryId + '/products'
        )
    }

    getProduct(id: number) {
        return this.http.get<ShopProduct>(BASE_URL + 'products/' + id)
    }

    addProduct(product: ShopProduct) {
        return this.http.post(BASE_URL + 'products', product)
    }

    editProduct(editedProduct: ShopProduct) {
        return this.http.put(
            BASE_URL + 'products/' + editedProduct.id,
            editedProduct
        )
    }

    delete(id: number) {
        return this.http.delete(BASE_URL + 'products/' + id)
    }

    getCategories() {
        return this.http.get<Category[]>(BASE_URL + 'categories')
    }
    getCategory(id: number) {
        return this.http.get<Category>(BASE_URL + 'categories/' + id)
    }
    addCategory(category: Category) {
        return this.http.post(BASE_URL + 'categories/', category)
    }
    editCategory(editedCategory: Category) {
        return this.http.put(
            BASE_URL + 'categories/' + editedCategory.id,
            editedCategory
        )
    }
    deleteCategory(id: number) {
        return this.http.delete(BASE_URL + 'categories/' + id)
    }
}


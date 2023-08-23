import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { ShopComponent } from './shop/shop.component'
import { LoginComponent } from './login/login.component'
import { CreateAccComponent } from './create-acc/create-acc.component'
import { CartComponent } from './cart/cart.component'
import { CreateProductComponent } from './create-product/create-product.component'
import { ProfileComponent } from './profile/profile.component'
import { UsersComponent } from './users/users.component'
import { PurchasesComponent } from './purchases/purchases.component'
import { authGuard } from './auth.guard'
import { adminGuard } from './admin.guard'
import { reverseGuard } from './reverse.guard'
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component'
import { CreateCategoryComponent } from './create-category/create-category.component'

const routes: Routes = [
    { path: '', redirectTo: 'home/categories', pathMatch: 'full' },
    { path: 'home', redirectTo: 'home/categories', pathMatch: 'full' },
    { path: 'home/categories', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [reverseGuard] },
    {
        path: 'create-acc',
        component: CreateAccComponent,
        canActivate: [reverseGuard],
    },
    { path: 'home/category/:id', component: ShopComponent },
    { path: 'home/cart', component: CartComponent, canActivate: [authGuard] },
    {
        path: 'admin/new-product',
        component: CreateProductComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'admin/product/:id',
        component: CreateProductComponent,
        canActivate: [adminGuard],
    },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    {
        path: 'admin/users',
        component: UsersComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'purchases',
        component: PurchasesComponent,
        canActivate: [authGuard],
    },
    {
        path: 'purchases/:id',
        component: ReceiptDetailsComponent,
        canActivate: [authGuard],
    },
    {
        path: 'admin/create-category',
        component: CreateCategoryComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'admin/categories/:id',
        component: CreateCategoryComponent,
        canActivate: [adminGuard],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

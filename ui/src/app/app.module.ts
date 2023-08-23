import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { HomeComponent } from './home/home.component'
import { ShopComponent } from './shop/shop.component'
import { LoginComponent } from './login/login.component'
import { CreateAccComponent } from './create-acc/create-acc.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { LoginService } from './login/login.service'
import { ShopService } from './shop/shop.service'
import { CategoryComponent } from './category/category.component'
import { CartComponent } from './cart/cart.component'
import { CartService } from './cart/cart.service'
import { CreateProductComponent } from './create-product/create-product.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatTableModule } from '@angular/material/table'
import { MatListModule } from '@angular/material/list'
import { ProfileComponent } from './profile/profile.component'
import { UsersComponent } from './users/users.component'
import { ProfileService } from './profile/profile.service'
import { UserService } from './users/user.service'
import { PurchasesComponent } from './purchases/purchases.component'
import { PurchaseService } from './purchases/purchase.service'
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component'
import { CreateCategoryComponent } from './create-category/create-category.component'
import { InterceptorService } from './interceptor.service'

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        ShopComponent,
        LoginComponent,
        CreateAccComponent,
        CategoryComponent,
        CartComponent,
        CreateProductComponent,
        ProfileComponent,
        UsersComponent,
        PurchasesComponent,
        ReceiptDetailsComponent,
        CreateCategoryComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatButtonToggleModule,
        MatTableModule,
        MatListModule,
    ],
    providers: [
        LoginService,
        ShopService,
        CartService,
        ProfileService,
        UserService,
        PurchaseService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

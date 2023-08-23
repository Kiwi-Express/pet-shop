import { Component, OnInit } from '@angular/core'
import { PurchaseService } from './purchase.service'
import { LoginService } from '../login/login.service'
import { Router } from '@angular/router'

export type Receipt = {
    id: number
    date: Date
    address: string
    city: string
    zip: string
    total: number
}
export type ReceiptDetails = {
    date: Date
    address: string
    city: string
    zip: string
    total: number
    price: number
    amount: number
    name: string
}

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {
    displayedColumns: string[] = [
        'date',
        'address',
        'city',
        'zip',
        'total',
        'edit',
    ]
    receipts: Receipt[] = []

    constructor(
        private purchaseService: PurchaseService,
        private loginService: LoginService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.purchaseService
            .getReceipts(this.loginService.getLoggedInUserId())
            .subscribe((result) => {
                this.receipts = result.map((result) => ({
                    ...result,
                    date: new Date(result.date),
                }))
            })
    }
    showDetails(id: number) {
        this.router.navigate(['/purchases', id])
    }
}

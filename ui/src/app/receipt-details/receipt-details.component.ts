import { Component } from '@angular/core'
import { PurchaseService } from '../purchases/purchase.service'
import { ReceiptDetails } from '../purchases/purchases.component'

@Component({
    selector: 'app-receipt-details',
    templateUrl: './receipt-details.component.html',
    styleUrls: ['./receipt-details.component.scss'],
})
export class ReceiptDetailsComponent {
    receiptDetails: ReceiptDetails[] = []
    displayedColumns: string[] = ['name', 'price', 'amount', 'total']
    constructor(private purchaseService: PurchaseService) {}
    ngOnInit(): void {
        this.purchaseService.getReceiptDetails(12).subscribe((result) => {
            this.receiptDetails = result.map((res) => ({
                ...res,
                date: new Date(res.date),
            }))
        })
    }
}

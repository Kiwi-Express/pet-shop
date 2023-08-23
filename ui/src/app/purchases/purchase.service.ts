import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BASE_URL } from '../constants'
import { Receipt } from './purchases.component'
import { ReceiptDetails } from './purchases.component'

@Injectable()
export class PurchaseService {
    constructor(private http: HttpClient) {}

    getReceipts(userId: number) {
        return this.http.get<Receipt[]>(BASE_URL + 'orders/' + userId)
    }
    getReceiptDetails(receiptId: number) {
        return this.http.get<ReceiptDetails[]>(
            BASE_URL + 'orders/' + receiptId + '/items'
        )
    }
}

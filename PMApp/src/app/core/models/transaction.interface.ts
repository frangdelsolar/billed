import { PaymentItem } from "./payment-item.interface"


export interface Transaction{
    id: number,
    amount: number,
    currency: string,
    completed: boolean,
    description: string,
    ignore: boolean,
    notes: string,
    type: string,
    date_of_transaction: string,
    payment_item?: PaymentItem,
}
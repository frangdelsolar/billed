import { Category } from "./category.interface";
import { CurrencyField } from "./currency-field.interface";

export interface PaymentItem{
    id: number,
    description: string,
    currency: CurrencyField,
    category: Category,
    recurrent: boolean,
    tags:any[]
}
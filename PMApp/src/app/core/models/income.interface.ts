export interface Income{
    currency: string,
    amount: number,
    committed: boolean,
    date_of_transaction: string,
    description: string,
    fixed: boolean,
    repeats: boolean,
    repetitions?: string,
    frequency?: string,
    notes?: string,
    ignore: boolean
}
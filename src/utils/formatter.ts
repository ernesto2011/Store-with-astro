export class Formatter {
    static currency(value:number, decimals=2):string{
        return new Intl.NumberFormat('EN-us',{
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: decimals
        }).format(value)
    }
}
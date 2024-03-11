import { CartItem } from "./Cartitem";

export class Cart{
    items:CartItem[] = [];
    totalPrice:number = 0;
    totalCount:number = 0;
    promoCode: string = '';
    promoDiscount: number = 0;
    discountTotal : number = 0;
}
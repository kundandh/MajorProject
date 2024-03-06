import { Product } from "./Product";

export class CartItem{
    constructor(public product:Product){
        this.product = product;
    }
    quantity:number = 1;
    price:number = this.product.price;
    imageUrl: string = this.product.imageUrl;
    productName : string = this.product.productName;
    brandName : string = this.product.brandName;
}
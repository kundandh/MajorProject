export class Product {
    _id!: number;
    productName!: string;
    description!: string;
    category!: string;
    brandName!: string;
    price!: number;
    size!: string;
    stars: number = 0;
    imageUrl!: string;
}
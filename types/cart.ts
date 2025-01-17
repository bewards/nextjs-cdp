export interface CartProduct {
    productId: number;
    sku: string;
    name: string;
    price: number;
    purchasePrice?: number;
    dateAdded: Date;
    quantity: number;
    category: string;
}
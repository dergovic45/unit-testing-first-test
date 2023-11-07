import { ProductData, ProductService } from "./product.service";

export enum CartOperation {
    Create = 'create',
    Update = 'update',
    Remove = 'remove'
}

export interface CartModification {
    operation: CartOperation;
    entry: CartEntryData | null;
};

export interface CartEntryData {
    productCode: string;
    productName: string;
    price: number;
    amount: number;
    total: number;
}

export interface CartData {
    totalPrice: number;
    entries: CartEntryData[];
}

export class CartService {

    storedCart: CartData = {
        totalPrice: 0,
        entries: []
    };

    constructor(private readonly productService: ProductService) { }

    async modifyProductAmount(code: string, amount: number): Promise<CartModification> {
        const product = await this.productService.findByCode(code);
        let entry = this.storedCart.entries.find(e => e.productCode === code);
        if (!entry && amount < 1) {
            throw new Error('invalid operation');
        }
        return entry ? this.updateEntry(entry, amount, product) : this.createEntry(code, amount, product);
    }

    private updateEntry(entry: CartEntryData, amount: number, product: ProductData): CartModification {
        this.storedCart.totalPrice -= entry.total;
        entry.amount += amount;
        if (entry.amount < 1) {
            const entryIndex = this.storedCart.entries.indexOf(entry);
            this.storedCart.entries.splice(entryIndex, 1);
            return { operation: CartOperation.Remove, entry: null };
        }
        else {
            entry.price = product.price;
            entry.total = entry.amount * product.price;
            this.storedCart.totalPrice = +(this.storedCart.totalPrice + entry.total).toFixed(2); // fix for floating number issue
            return { operation: CartOperation.Update, entry };
        }
    }

    private createEntry(code: string, amount: number, product: ProductData): CartModification {
        const entry: CartEntryData = {
            productCode: code,
            productName: product.name,
            price: product.price,
            amount,
            total: amount * product.price
        };
        this.storedCart.entries.push(entry);
        this.storedCart.totalPrice += entry.total;
        return { operation: CartOperation.Create, entry };
    }
}
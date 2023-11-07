
export interface ProductData {
    name: string;
    price: number;
}

export class ProductService {

    findByCode(code: string): Promise<ProductData> {
        return Promise.reject('not implemented yet');
    }
}
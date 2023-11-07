import { CartOperation, CartService } from "./cart.service";
import { ProductService } from "./product.service";

describe('CartService', () => {

    let productService: ProductService;
    let cartService: CartService;

    beforeEach(() => {
        productService = new ProductService();
        cartService = new CartService(productService);
        cartService.storedCart = {
            totalPrice: 14.23,
            entries: [
                {
                    productCode: 'abc',
                    productName: '',
                    amount: 1,
                    price: 2.23,
                    total: 2.23
                },
                {
                    productCode: 'xyz',
                    productName: '',
                    amount: 5,
                    price: 2.40,
                    total: 12
                }
            ]
        };
    });

    it('should add entry', async () => {
        spyOn(productService, 'findByCode').and.resolveTo({ name: 'something', price: 7.21 });

        const result = await cartService.modifyProductAmount('123', 2);

        expect(productService.findByCode).toHaveBeenCalledOnceWith('123');
        expect(result.operation).toEqual(CartOperation.Create);
        expect(result.entry).toEqual({
            productCode: '123',
            productName: 'something',
            amount: 2,
            price: 7.21,
            total: 14.42
        });
        expect(cartService.storedCart.totalPrice).toEqual(28.65);
        expect(cartService.storedCart.entries).toHaveSize(3);
    });

    it('should update entry', async () => {
        spyOn(productService, 'findByCode').and.resolveTo({ name: 'something', price: 7.21 });

        const result = await cartService.modifyProductAmount('abc', 2);

        expect(productService.findByCode).toHaveBeenCalledOnceWith('abc');
        expect(result.operation).toEqual(CartOperation.Update);
        expect(result.entry).toEqual({
            productCode: 'abc',
            productName: '', // this is not updated by the logic
            amount: 3,
            price: 7.21,
            total: 21.63
        });
        expect(cartService.storedCart.totalPrice).toEqual(33.63);
        expect(cartService.storedCart.entries).toHaveSize(2);
    });

    it('should remove entry', async () => {
        spyOn(productService, 'findByCode').and.resolveTo({ name: 'something', price: 7.21 });

        const result = await cartService.modifyProductAmount('abc', -2);

        expect(productService.findByCode).toHaveBeenCalledOnceWith('abc');
        expect(result.operation).toEqual(CartOperation.Remove);
        expect(result.entry).toBeNull();
        expect(cartService.storedCart.totalPrice).toEqual(12);
        expect(cartService.storedCart.entries).toHaveSize(1);
    });

    it('should recalculate entry', async () => {
        spyOn(productService, 'findByCode').and.resolveTo({ name: 'something', price: 7.21 });

        const result = await cartService.modifyProductAmount('xyz', 0);

        expect(productService.findByCode).toHaveBeenCalledOnceWith('xyz');
        expect(result.operation).toEqual(CartOperation.Update);
        expect(result.entry).toEqual({
            productCode: 'xyz',
            productName: '', // this is not updated by the logic
            amount: 5,
            price: 7.21,
            total: 36.05
        });
        expect(cartService.storedCart.totalPrice).toEqual(38.28);
        expect(cartService.storedCart.entries).toHaveSize(2);
    });

    it('should throw error when product with zero amount is added', (done) => {
        spyOn(productService, 'findByCode').and.resolveTo({ name: 'something', price: 7.21 });

        cartService.modifyProductAmount('123', 0)
            .then(() => {
                done.fail('expected error');
            })
            .catch(error => {
                expect((error as Error).message).toEqual('invalid operation')
                done();
            });
    });
});
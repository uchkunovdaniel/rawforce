export class Cart {
    products: Product[];
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;

    constructor({ products = [], subtotal = 0, shipping = 0, discount = 0, total = 0 }: { products?: Product[], subtotal?: number, shipping?: number, discount?: number, total?: number}) {
        this.products = products;
        this.total = total;
        this.subtotal = subtotal;
        this.shipping = shipping;
        this.discount = discount;
    }
    add(product: Product) {
        this.products = this.products.filter((value, index) => {
             const _value = JSON.stringify(value);
             return index === this.products.findIndex(obj => {
                 return JSON.stringify(obj) === _value;
             });
         });
        if (this.products.find(p => p.name === product.name) !== undefined) {
            this.products.find(p => p.name === product.name)!.quantity++;
        } else this.products.push(product);
        this.subtotal += product.price
        this.__updateTotal()
    }
    decrement(product: Product) {
        this.products.find(p => p.name === product.name)!.quantity--;
        this.subtotal -= product.price
        this.__updateTotal();
    }
    remove(product: Product) {
        this.products = this.products.filter(p => p.name !== product.name);
        this.subtotal -= product.price * product.quantity;
        this.__updateTotal();
    }
    clear() {
        this.products = [];
        this.subtotal = 0;
        this.shipping = 0;
        this.discount = 0;
        this.total = 0;
    }
    __updateTotal() {
        this.total = this.subtotal + this.shipping;
        if (this.discount > 0) this.total *= (this.discount / 100);
        if (this.total < 0) this.total = 0;
        if (this.subtotal < 0) this.subtotal = 0;
    }
}

class Cart {
    products: Set<string>;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;

    constructor() {
        this.products = new Set<string>();
        this.total = 0;
        this.subtotal = 0;
        this.shipping = 0;
        this.discount = 0;
    }
    add(product: Product) {
        if (this.products.has(JSON.stringify(product))) {
            this.products.delete(JSON.stringify(product));
            product.quantity++
            this.products.add(JSON.stringify(product));
        } else this.products.add(JSON.stringify(product));

        this.subtotal += product.price
        this.__updateTotal()
    }
    decrement(product: Product) {
       if (this.products.has(JSON.stringify(product))) {
            this.products.delete(JSON.stringify(product));
            product.quantity--
            this.products.add(JSON.stringify(product));
        }
        this.subtotal -= product.price;
        this.__updateTotal();
    }
    remove(product: Product) {
        this.products.delete(JSON.stringify(product))
        this.subtotal -= product.price * product.quantity;
        this.__updateTotal();
    }
    clear() {
        this.products.clear();
        this.subtotal = 0;
        this.shipping = 0;
        this.discount = 0;
        this.total = 0;
    }
    __updateTotal() {
        this.total = this.subtotal + this.shipping;
        if (this.discount > 0) this.total *= (this.discount / 100);
    }
}

const cart = new Cart();

export const actions = {
    add: async ({ request }) => {
        const product: Product = await request.json();
        return cart.add(product);
    },
    remove: async ({ request }) => {
        const product: Product = await request.json();
        cart.remove(product);
    },
    clear: () => {
        cart.clear();
    },
    decrement: async ({request}) => {
        const product: Product = await request.json();
        cart.decrement(product);
    }

}

export function load(){
    return {...cart};
}
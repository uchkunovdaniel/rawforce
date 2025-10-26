import {Cart} from "../../cart";

const cart = new Cart({});

export const actions = {
    add: async ({ request }) => {
        const product: Product = await request.json()
        cart.add(product);
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
    },
}

export function load(){
    cart.products = cart.products.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === cart.products.findIndex(obj => {
            return JSON.stringify(obj) === _value;
        });
    });

    return {...cart};
}
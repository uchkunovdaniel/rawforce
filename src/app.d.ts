// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type Pocketbase from 'pocketbase';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase;
			user: Pocketbase.Record | null;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	type Product = {
        name: string;
        price: number;
        image: string;
        quantity: number;
        description: string;
        id: string;
        kcal: number;
        mass: number;
        ingridients: string;
        collectionId: string;
        collectionName: string;
    }
    interface Cart {
        products: Product[],
        subtotal: number,
        shipping: number,
        discount: number,
        total: number,
        add: (product: Product) => void,
        remove: (product: Product) => void,
        clear: () => void,
        decrement: (product: Product) => void,
    }
     type User = {
        name: string;
        occupation: string;
        picture: string;
        review: string;
    }
}

export {};

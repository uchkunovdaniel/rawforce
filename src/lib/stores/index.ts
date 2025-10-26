import { writableLocal } from "./store-localstorage"

    const cart = writableLocal<string>("cart", JSON.stringify({}))

export { cart }
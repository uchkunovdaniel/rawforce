import { redirect } from '@sveltejs/kit';

export const load = async ({locals, request}) => {
		const allOrders = await locals.pb.collection("orders").getFullList({expand: 'user'})
		const reviews = await locals.pb.collection("reviews").getFullList({sort: '@random'})
		const products: Product[] = await locals.pb.collection('products').getFullList();
		const box: Product = products.find(p => p.name === "Кутия с 5 вкуса барчета")!
		products.forEach(p => {
			p.image = locals.pb.files.getURL(p, p.image)
		})
		products.forEach(p=> {
			if(p.id === box.id) products.splice(products.indexOf(p), 1)
		})
		reviews.forEach(review => {
			review.avatar = locals.pb.files.getURL(review, review.avatar)
		})
		if(locals.pb.authStore.isSuperuser && !request.url.includes("/admin")) {
			return redirect(303, "/admin");
		}
		if(!locals.pb.authStore.isValid || locals.pb.authStore.isSuperuser) return (
        {
            user: null,
            orders: null,
						allOrders: allOrders ? allOrders.reverse() : null,
						allIds: allOrders ? allOrders.map((order) => order.id ) : null,
						reviews: reviews,
						products: products,
						box: box,
        }
    )

    const orders = await locals.pb.collection('users').getOne(locals.pb.authStore.record!.id, {expand: 'orders'})
    return { user: locals.pb.authStore.record, orders: orders.expand?.orders? orders.expand.orders.reverse() : null, reviews: reviews, products: products, box: box };

}
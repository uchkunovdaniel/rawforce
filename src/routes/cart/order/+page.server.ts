import { fail } from '@sveltejs/kit';

let shippingOptions = {}

export async function load({locals}){
	const data = await locals.pb.collection('shipping').getFullList()

	data.forEach(d => {
		shippingOptions[d.name] = d.price
	})

	return { shippingOptions };
}

export const actions = {
    order: async ({request, locals})  => {
        const data = await request.formData();
        const products = JSON.parse(data.get('products') as string);
        const total = JSON.parse(data.get('total') as string);
        const shipping_type = data.get('shipping_type') as "speedy" | "econtBox" | "econtAddress"| "econtOffice"	;
				const shipping: number = shippingOptions[shipping_type];
				const address = data.get('address') as string;


				const lastOrder = await locals.pb.collection('orders').getList(1,1,{sort:'-created'});
        let newCount = 0
        if(lastOrder.items.length > 0) newCount = lastOrder.items[0].count

        if(locals.pb.authStore.record){
            const user = JSON.parse(data.get('user') as string).id;
						try {
							console.log(shipping_type);
							await locals.pb.collection('orders').create({products, user, total, "count": newCount + 1, shipping_type, shipping, address})
								.then(
									order => {locals.pb.collection('users').update(user, {'orders+': order.id})}
								);
						} catch(error) {
							return fail(400, {failure: true});
						}
				}
        else{
					const guest = JSON.parse(data.get('guest') as string)

					try	{
					await locals.pb.collection('orders').create({products, guest, total, "count": newCount + 1, shipping_type, shipping, address})
        } catch(_){
						return fail(400, {failure: true});
					}
					}
    }
}
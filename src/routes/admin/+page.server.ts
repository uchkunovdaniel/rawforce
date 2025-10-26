export const actions = {
	addProduct: async ({ request, locals }) => {
		const data = await request.formData();
		await locals.pb.collection('products').create(data);
	},
	approve: async ({ request, locals }) => {
		const data = await request.formData();
		await locals.pb.collection('orders').update(data.get("orderId") as string, {"shipped": true});
	},
	cancel: async ({ request, locals }) => {
		const data = await request.formData();
		await locals.pb.collection('orders').delete(data.get("orderId") as string);
	},
	editProduct: async ({ request, locals }) => {
		const data = await request.formData();
		const product = await locals.pb.collection('products').getOne(data.get("id") as string);
		if ((data.get("image") as File).size === 0) data.append("image", product.image);
		await locals.pb.collection('products').update(data.get("id") as string, data)
	}
};
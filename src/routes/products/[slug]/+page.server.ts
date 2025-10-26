import {redirect} from "@sveltejs/kit";

export const load = async ({params, locals}) => {
    const products: Product[] = await locals.pb.collection("products").getFullList();
		const box: Product = products.find(p => p.name === "Кутия с 5 вкуса барчета")!
		if(box.id === params.slug) {
			box.image = locals.pb.files.getURL(box, box.image);
			return { box, type: 'box' };
		}
		for (const product of products) {
			if (product.id === params.slug) {
				product.image = locals.pb.files.getURL(product, product.image);
				return { product, type: 'product' };
			}
		}
    return redirect(303, "/products")
}
import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
    if (!locals.user) {
        return redirect(303, '/')
    }
}

export const actions = {
	addReview: async ({locals, request}) => {
		const data = await request.formData()
		await locals.pb.collection('reviews').create(data)
}
}
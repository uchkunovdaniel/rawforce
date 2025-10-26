import {fail} from "@sveltejs/kit";

export const actions = {
	register: async ({request, locals}) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;
		await locals.pb.collection('users').create({email, password, passwordConfirm})
		await locals.pb.collection('users').authWithPassword(email, password)
	},
	login: async ({request, locals}) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        try {
            await locals.pb.collection('users').authWithPassword(email, password)
        } catch (_) {
            return fail(400, {incorrect: true})
        }

    },
		superuserLogin: async ({request, locals}) => {
				const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        try {
            await locals.pb.collection('_superusers').authWithPassword(email, password)
        } catch (_) {
            return fail(400, {incorrect: true})
        }
		},
    logout: async ({locals}) => {
        locals.pb.authStore.clear();
    },
    changeUser: async ({locals, request}) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        const surname = data.get('surname') as string;
        const phone = data.get('phone') as string;
        const city = data.get('city') as string;
        const state = data.get('state') as string;

        await locals.pb.collection('users').update((locals.pb.authStore.record?.id as string), {name, surname, phone, city, state});
    }
}
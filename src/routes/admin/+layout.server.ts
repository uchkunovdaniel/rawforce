import { redirect } from '@sveltejs/kit';

export function load({locals, request}){
	if (!locals.pb.authStore.isSuperuser && !request.url.endsWith('/admin/login')) {
		return redirect(303, "/admin/login");
	}
	if(locals.pb.authStore.isSuperuser && request.url.endsWith('/admin/login')) {
		return redirect(303, "/admin");
	}
}
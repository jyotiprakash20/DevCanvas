// import { redirect } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';

/**  @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	let { supabase } = await parent();
	let username = params['username'];
	// console.log();
	const { data, error: err } = await supabase.from('profiles').select('*').eq('username', username);

	// console.log(data, session.user.email);
	if (err) throw err;
	if (data.length > 0) {
		data[0].socials = JSON.parse(data[0].socials);
	} else {
		throw error(404, 'Not Found');
	}
	let details = data.length > 0 ? data[0] : data;
	// console.log(details);
	return { details, isFound: data.length > 0 };
}

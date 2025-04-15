import type { PageServerLoad } from './$types';
import { icons } from '$lib';
export const load = (async () => {
    return { icons: Promise.all(icons), hello: "hello" };
}) satisfies PageServerLoad;
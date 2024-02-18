import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';

if (!SECRET_STRIPE_KEY) {
	throw new Error('SECRET_STRIPE_KEY is not set in environment variables.');
}

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2023-10-16'
});

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items;

	/*
        we have [ { id: "1", quantity: 4 }, { id: "2", quantity: 3 }]
        stripe wants: [ { price: "1", quantity: 4 }, { price: "2", quantity: 3 }]
    */

	let lineItems: any[] = [];

	items.forEach((item: any) => {
		lineItems.push({
			price: item.id,
			quantity: item.quantity
		});
	});

	// It gives us a URL for the person to check out with
	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});

	return new Response(
		JSON.stringify({
			url: session.url
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};

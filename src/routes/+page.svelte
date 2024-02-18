<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';

	const products: Product[] = [
		{
			id: 'price_1OlB48E05Sx1PgXesajn3cCa',
			name: 'Coffee',
			price: 5
		},
		{
			id: 'price_1OlBDfE05Sx1PgXe1b5uMO7W',
			name: 'Sunglasses',
			price: 10
		},
		{
			id: 'price_1OlBDtE05Sx1PgXeS0bfX2hV',
			name: 'Water Bottle',
			price: 15
		}
	];

	async function checkoutProducts() {
		await fetch('api/stripeCheckout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				items: get(cartItems)
			})
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				data.url;
				window.location.replace(data.url);
			});
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Svelte kit</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkoutProducts()}
				>Checkout with stripe API</button
			>
		</div>
	</div>
</div>

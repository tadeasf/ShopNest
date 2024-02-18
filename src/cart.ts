// React Context

import { writable, get } from 'svelte/store';

export const cartItems = writable<CardItem[]>([]);

// [ { id: "1", quantity: 4 }, { id: "2", quantity: 3 }]

// add to cart:

export const addToCart = (id: string) => {
	// cardItems is a writable not a value
	// get(cardItems) => [ { id: "1", quantity: 4 }, { id: "2", quantity: 3 }]
	let items = get(cartItems);

	// Item is not in the cart at all, so add the object to the cart
	let itemIndex = items.findIndex((item) => item.id === id);

	if (itemIndex !== -1) {
		cartItems.update(() => {
			let updatedItems = items.map((item) => {
				if (item.id === id) {
					return {
						...item,
						quantity: item.quantity + 1
					};
				}
				return item;
			});
			return updatedItems;
		});
	} else {
		cartItems.update(() => {
			return [...items, { id, quantity: 1 }];
		});
	}

	// Item is in the cart, add to the quantity of that
};

// remove from card (remove one)

export const removeFromCart = (id: string) => {
	let items = get(cartItems);

	let itemIndex = items.findIndex((item) => item.id === id);

	if (items[itemIndex]?.quantity - 1 === 0) {
		items.splice(itemIndex, 1);
	}

	cartItems.update(() => {
		let updatedItems = items.map((item) => {
			if (item.id === id) {
				return {
					...item,
					quantity: item.quantity - 1
				};
			}
			return item;
		});
		return updatedItems;
	});
};

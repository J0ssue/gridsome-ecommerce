<style lang="scss" scoped>
	@import "../assets/scss/stripe.scss";
	.jBorder {
		height: 2px;
		width: 65px;
	}

	label {
		color: gray;
	}
</style>

<template>
	<transition name="fade" appear>
		<layout>
			<div class="pb-10 jGrid mx-auto">
				<header class="mb-10">
					<div class="jBorder bg-jOrange"></div>
					<h1 class="text-4xl uppercase font-bold">checkout</h1>
					<div class="jBorder bg-jOrange"></div>
				</header>
				<main class="md:flex">
					<div class="mb-10 md:flex-1 md:pr-20">
						<div class="capitalize">
							<h2 class="font-bold text-xl mb-6">billing details</h2>
							<div class="mb-4">
								<label for="">email address</label>
								<input
									type="email"
									class="w-full block border border-gray-600 pl-2 py-1 focus-none"
									v-model="meta.email"
								/>
							</div>
							<div class="mb-4">
								<label for="">name</label>
								<input
									type="text"
									class="w-full block border border-gray-600 pl-2 py-1 focus-none"
									v-model="meta.name"
								/>
							</div>
							<div class="mb-4">
								<label for="">address</label>
								<input
									type="text"
									class="w-full block border border-gray-600 pl-2 py-1 focus-none"
									v-model="meta.address"
								/>
							</div>
							<div class="mb-4 flex justify-between">
								<div class="flex-1 pr-6">
									<label for="">city</label>
									<input
										type="text"
										class="w-full block border border-gray-600 pl-2 py-1 focus-none"
										v-model="meta.city"
									/>
								</div>
								<div class="flex-1 pl-6">
									<label for="">state</label>
									<input
										type="text"
										class="w-full block border border-gray-600 pl-2 py-1 focus-none"
										v-model="meta.state"
									/>
								</div>
							</div>
							<div class="mb-4 flex justify-between">
								<div class="flex-1 pr-6">
									<label for="">postal code</label>
									<input
										type="text"
										class="w-full block border border-gray-600 pl-2 py-1 focus-none"
										v-model="meta.post"
									/>
								</div>
								<div class="flex-1 pl-6">
									<label for="">phone number</label>
									<input
										type="text"
										class="w-full block border border-gray-600 pl-2 py-1 focus-none"
										v-model="meta.phone"
									/>
								</div>
							</div>
							<h2 class="font-bold text-xl mb-6">payment details</h2>
							<div>
								<label for="">name on card</label>
								<input
									type="text"
									class="w-full block border border-gray-600 pl-2 py-1 focus-none"
									v-model="meta.cardName"
								/>
							</div>
						</div>
						<form id="payment-form" @submit.prevent="createToken">
							<div class="form-row">
								<label for="card-element">
									Credit or debit card
								</label>
								<div id="card-element">
									<!-- A Stripe Element will be inserted here. -->
								</div>
							</div>

							<button
								class="block w-full bg-jOrange py-2 rounded hover:bg-orange-700 uppercase text-white custom-transition mt-4"
							>
								Submit Payment
							</button>
						</form>
					</div>
					<div class="md:flex-1 md:pl-20">
						<h2 class="font-bold text-xl mb-6 border-b-2 border-black pb-2">
							your order
						</h2>
						<div
							class="flex justify-between items-center py-4  border-b-2 border-black pb-4"
							v-for="cartProduct in cartProducts"
							:key="cartProduct.id"
						>
							<g-image
								src="~/assets/images/hero.jpg"
								width="100"
								height="100"
							></g-image>
							<div>
								<p class="font-bold capitalize text-sm">
									{{ cartProduct.name }}
								</p>
								<p class="text-gray-500">
									{{ cartProduct.details }}
								</p>
								<p class="font-bold text-sm">
									${{ cartProduct.price * cartProduct.qty }}
								</p>
							</div>
							<div class="border border-black px-4 py-2">
								{{ cartProduct.qty }}
							</div>
						</div>
						<div
							class="flex justify-between items-center font-bold border-b-2 border-black py-4"
						>
							<p>total</p>
							<p>${{ total }}</p>
						</div>
					</div>
				</main>
			</div>
		</layout>
	</transition>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import { setTimeout } from "timers";
	let stripeInstance = Stripe("pk_test_320R66PW82UC3PMs5ih0Hmp2007mp45r2M");

	export default {
		name: "Checkout",

		data() {
			return {
				stripe: null,
				card: null,
				elements: null,
				meta: {
					email: null,
					name: null,
					address: null,
					city: null,
					state: null,
					post: null,
					phone: null,
					cardName: null
				}
			};
		},
		created() {
			// fetch cart products on reload
			if (this.cartProducts.length === 0) {
				this.fetchCartProducts();
			}
		},
		mounted() {
			this.stripe = stripeInstance;
			this.elements = this.stripe.elements();

			this.card = this.elements.create("card");
			this.card.mount("#card-element");
		},

		methods: {
			async createToken() {
				let token = await this.stripe.createToken(this.card);

				let customerData = this.meta;
				customerData.amount = this.total;

				customerData.order = this.cartProducts.map(product => {
					return {
						product_id: product.id,
						qty: product.qty,
						amount: product.price * product.qty
					};
				});

				this.buy({
					token: token.token.id,
					meta: customerData
				}).then(response => {
					this.$router.push("/");
					this.$swal({
						type: "success",
						message: "purchase complete",
						showConfirmButton: false,
						timer: 1500
					});
				});
			},
			...mapActions("cart", ["fetchCartProducts"]),
			...mapActions("purchases", ["buy"])
		},

		computed: {
			cartLength() {
				return this.cartProducts.length;
			},
			total() {
				let total = 0;
				this.cartProducts.forEach(item => {
					let currentItemPrice = item.price * item.qty;
					return (total = total + currentItemPrice);
				});
				return total;
			},
			...mapGetters("cart", ["cartProducts"])
		}
	};
</script>

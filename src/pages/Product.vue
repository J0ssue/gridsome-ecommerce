<style lang="scss" scoped>
</style>

<template>
	<layout>
		<section class="flex flex-wrap">
			<div class="md:p-20 w-full lg:w-1/2" v-if="product">
				<div class="border lg:p-20">
					<g-image src="~/assets/images/hero.jpg"></g-image>
				</div>
			</div>
			<div class="p-5 md:p-20 w-full lg:w-1/2" v-if="product">
				<header class="mb-6">
					<h1 class="text-black text-3xl font-bold">
						{{ product.name }}
					</h1>
					<div class="text-gray-500 mb-2">{{ product.details }}</div>
					<div class="text-black text-3xl font-bold">
						${{ product.price.toFixed(2) }}
					</div>
				</header>
				<main class="mb-10 lg:pr-10">
					{{ product.description }}
				</main>
				<div>
					<button
						class="border border-jOrange rounded py-2 px-4 text-jOrange uppercase font-bold hover:bg-jOrange hover:text-white custom-transition focus-outline-none"
						@click="addProductToCart(product)"
					>
						add to cart
					</button>
				</div>
			</div>
		</section>
		<section class="bg-gray-300 py-10">
			<h2 class="text-2xl font-bold text-black capitalize text-center mb-10">
				you might also like
			</h2>
			<div class="jGrid flex justify-between mx-auto">
				<div
					v-for="product in mightAlsoLike"
					:key="product.id"
					class="flex-1 mx-2 flex flex-col bg-white border-2 border-gray-500 p-10 justify-center items-center cursor-pointer"
					@click="handleProductFetch(product.id)"
				>
					<g-image
						src="~/assets/images/hero.jpg"
						width="100"
						height="100"
						class="mb-2"
					></g-image>
					<p class="text-black font-bold capitalize mb-4">
						{{ product.name }}
					</p>
					<p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
				</div>
			</div>
		</section>
	</layout>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";

	export default {
		name: "JuiceeProduct",

		created() {
			if (this.product === null) {
				this.$router.push("/");
			}
		},

		methods: {
			handleProductFetch(id) {
				this.fetchProduct(id);
			},

			addProductToCart(product) {
				let productSchema = {
					product_id: product.id,
					name: product.name,
					price: product.price,
					details: product.details
				};
				this.addToCart(productSchema);
			},

			...mapActions("products", ["fetchProduct"]),

			...mapActions("cart", ["addToCart", "fetchCartProducts"])
		},

		computed: {
			...mapGetters("products", ["product", "mightAlsoLike"])
		}
	};
</script>
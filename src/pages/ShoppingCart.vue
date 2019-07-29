<template>
	<transition name="fade" appear>
		<layout>
			<div class="jGrid mx-auto">
				<header
					class="bg-jOrange px-10 py-10 flex items-center justify-between"
				>
					<h1 class="text-3xl font-bold text-white-trans" v-if="!!cartLength">
						{{ cartLength }} items in shopping cart
					</h1>
					<div
						class="text-3xl font-bold text-white-trans capitalize"
						v-if="cartLength === 0"
					>
						shopping cart is empty <br />
						<g-link class="text-xl" to="/shop"
							>click here to go back to shop</g-link
						>
					</div>
				</header>
				<div class="pt-20">
					<section
						class="invisible md:visible flex justify-between text-gray-600 capitalize border-black border-b-2 pb-2"
					>
						<div class="flex-1">bundle</div>
						<div class="flex-1 pl-8">bundle name</div>
						<div class="spacer flex-1"></div>
						<div class="flex-1 text-right">quantity</div>
						<div class="flex-1 text-right">price</div>
					</section>
					<section
						class="flex flex-col md:flex-row justify-between items-center uppercase py-10 border-black border-b-2"
						v-for="(cartProduct, index) in cartProducts"
						:key="index * 15"
					>
						<g-image
							src="~/assets/images/hero.jpg"
							width="100"
							height="100"
						></g-image>
						<div>
							<h4 class="font-bold">{{ cartProduct.name }}</h4>
							<div class="text-gray-600">
								{{ cartProduct.details }}
							</div>
						</div>
						<div class="text-white">
							<button
								class="block bg-black px-4 text-sm rounded uppercase hover:bg-gray-700 custom-transition my-2 focus-outline-none"
								@click="deleteFromCart(cartProduct.id)"
							>
								remove
							</button>
							<button
								class="block bg-jOrange px-4 text-sm rounded uppercase hover:bg-orange-700 custom-transition focus-outline-none"
							>
								save for later
							</button>
						</div>
						<div>
							<!--! Todo: add binding to input -->
							<input
								type="number"
								min="1"
								max="10"
								:value="cartProduct.qty"
								@change="updateCartProduct(cartProduct)"
							/>
						</div>
						<div class="font-bold">
							$ {{ cartProduct.price * cartProduct.qty }}
						</div>
					</section>
				</div>
				<!-- end of products in shopping cart -->

				<section class="mt-5">
					<div class="capitalize mb-2">have a coupon code?</div>
					<form class="border border-gray-700" style="width: 400px;">
						<!--! Todo: add binding to input -->
						<div class="flex justify-between p-5">
							<input
								type="text"
								class="border border-gray-500 block flex-1 focus-outline-none pl-4"
							/>
							<button
								class="block text-center bg-jOrange px-6 py-1 uppercase font-bold focus-outline-none"
							>
								apply
							</button>
						</div>
					</form>
				</section>
				<footer class="bg-gray-300 py-10 mt-10 mb-10">
					<div class="mb-20">
						<div class="spacer"></div>
						<p class="font-bold text-right mr-4">total ${{ total }}</p>
					</div>
					<div class="mt-5 flex justify-end items-bottom h-full">
						<g-link
							to="/shop"
							class="bg-black py-2 px-4 text-white hover:bg-gray-700 custom-transition focus-outline-none"
						>
							go back to shopping
						</g-link>
						<g-link
							to="/checkout"
							class="bg-jOrange py-2 px-4 text-white hover:bg-gray-700 custom-transition mx-4 focus-outline-none"
						>
							go to payment
						</g-link>
					</div>
				</footer>
				<section class="bg-gray-300 py-10">
					<h2
						class="text-2xl font-bold text-black capitalize text-center mb-10"
						v-if="!!cartLength"
					>
						you might also like
					</h2>
					<h2
						class="text-2xl font-bold text-black capitalize text-center mb-10"
						v-if="cartLength === 0"
					>
						recommended
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
			</div>
		</layout>
	</transition>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";

	export default {
		name: "ShoppingCart",
		created() {
			// fetch recommended products on reload
			// fetch cart products on reload
			if (this.cartProducts.length === 0) {
				this.fetchCartProducts();
			}
		},

		methods: {
			updateCartProduct(product) {
				let productSchema = {
					products_id: product.id,
					quantity: event.target.value
				};
				this.updateCart(productSchema);
			},

			handleProductFetch(id) {
				this.fetchProduct(id).then(response => {
					this.$router.push("/product");
				});
			},

			...mapActions("cart", [
				"fetchCartProducts",
				"deleteFromCart",
				"addToCart",
				"updateCart"
			]),
			...mapActions("products", ["fetchProduct", "fetchProducts"])
		},

		computed: {
			cartLength() {
				return this.cartProducts.length;
			},

			total() {
				let total = 0;
				this.cartProducts.forEach(item => {
					total = total + item.price * item.qty;
				});
				return total;
			},

			...mapGetters("cart", ["cartProducts"]),
			...mapGetters("products", ["mightAlsoLike", "products"])
		}
	};
</script>

<style lang="scss" scoped>
</style>
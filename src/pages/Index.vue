<style lang="scss" scoped>
	@import "../assets/scss/home.scss";
</style>

<template>
	<transition name="fade" appear>
		<Layout>
			<header class="hero text-white">
				<div class="hero__title absolute inset-0 text-center">
					<div class="text-6xl">JUICEE DESIGN</div>
					<div>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
						libero.
					</div>
				</div>
			</header>

			<section class="categories">
				<div class="my-10 text-center">
					<h2 class="capitalize font-bold text-2xl mb-5">
						juicee design shop
					</h2>
					<p class="text-gray-600 md:w-1/2 mx-auto">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
						exercitationem, reiciendis aut tempore atque animi voluptatibus
						praesentium aperiam possimus maxime libero architecto error aut!
					</p>
				</div>
				<div class="flex-1 flex flex-wrap justify-between p-6">
					<div
						class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3"
						v-for="product in products"
						:key="product.id"
					>
						<div
							class="card shadow-xl hover:shadow-none border custom-transition flex flex-col p-2 my-4 mx-auto"
							style="height: 420px;"
						>
							<header class="relative">
								<g-image
									src="~/assets/images/hero.jpg"
									width="206"
									height="206"
								/>
								<div
									class="absolute w-full h-full top-0 left-0 custom-hover custom-transition flex justify-center items-center cursor-pointer"
								>
									<a
										class="bg-jOrange px-4 py-1 rounded-full invisible hover:text-white text-white hover:bg-orange-700"
										style="color: white !impotant"
										@click="handleProductFetch(product.id)"
									>
										more info
									</a>
								</div>
							</header>
							<main class="flex justify-between flex-1 p-4">
								<div>
									<div class="text-lg font-bold">{{ product.name }}</div>
									<div class="text-sm">
										{{ product.description.substring(0, 20) }}...
									</div>
								</div>
								<div>star</div>
							</main>
							<footer
								class="border-t-2 py-4 flex justify-between px-4 text-gray-500"
							>
								<button
									class="bg-jOrange text-white py-1 px-2 rounded-full text-xs hover:bg-orange-600 focus-none uppercase"
									@click="handleAddToCart(product)"
								>
									add to cart
								</button>
								<div>${{ product.price }}</div>
							</footer>
						</div>
					</div>
				</div>
			</section>
			<Pagination></Pagination>
		</Layout>
	</transition>
</template>

<script>
	import Pagination from "../components/Pagination";
	import { mapActions, mapGetters, mapMutations } from "vuex";
	export default {
		name: "Home",

		data() {
			return {
				paginationData: null
			};
		},

		mounted() {
			this.fetchProducts();

			// fetch cart products if the length equals 0.
			if (this.cartProducts.length === 0) {
				this.fetchCartProducts();
			}
		},

		metaInfo: {
			title: "Hello, world!"
		},

		methods: {
			handleAddToCart(product) {
				const Toast = this.$swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: true,
					timer: 3000
				});

				this.addToCart(product).then(res => {
					Toast.fire({
						type: res.type,
						text: res.message
					});
					Toast.fire({
						type: res.type,
						title: res.message,
						html: `
								<a
									href="/shopping-cart" 
									class="bg-green-500 mx-6 px-4 text-white font-bold py-2 rounded"> 
										Go to shopping cart
								</a>`
					});
				});
			},
			handleProductFetch(id) {
				this.fetchProduct(id).then(response => {
					this.$router.push("/product");
				});
			},

			...mapActions("products", ["fetchProducts", "fetchProduct"]),

			...mapActions("cart", ["fetchCartProducts", "addToCart"])
		},

		computed: {
			...mapGetters("products", ["products"]),
			...mapGetters("cart", ["cartProducts"])
		}
	};
</script>


<style lang="scss" scoped>
	.hero {
		background-image: url("../assets/images/hero.jpg");
		background-position: center center;
		background-size: cover;
		min-height: 400px;
		position: relative;
		&::before {
			content: "";
			width: 100%;
			height: 100%;
			position: absolute;
			background: rgba(0, 0, 0, 0.5);
		}

		&__title {
			margin-top: 160px;
		}
	}

	.card {
		width: 206px;
	}

	.custom-hover {
		&:hover {
			background: rgba(0, 0, 0, 0.7);
		}

		&:hover a {
			visibility: visible;
		}
	}

	.jBorder {
		height: 2px;
		width: 65px;
	}
</style>

<template>
	<transition name="fade" appear>
		<layout>
			<header class="mb-10 jGrid mx-auto">
				<div class="jBorder bg-jOrange"></div>
				<h1 class="text-4xl uppercase font-bold">shop</h1>
				<div class="jBorder bg-jOrange"></div>
			</header>
			<div class="font-bold text-lg mt-10">Categories</div>
			<section class="categories flex">
				<div class=" custom-shadow pl-20 pr-16 pb-20 pt-10">
					<ul
						class="pl-2 text-sm"
						v-for="(category, index) in categories"
						:key="index * 3"
					>
						<div class="font-bold text-lg mb-4 mt-10">{{ category.name }}</div>
						<li
							class="mb-2 cursor-pointer text-gray-450 font-bold hover:text-jOrange custom-transition"
							v-for="(product, index) in category.products"
							:key="index * 2"
						>
							{{ product.name }}
						</li>
					</ul>
				</div>
				<div class="flex-1 flex flex-wrap justify-between p-6">
					<div
						class="w-full sm:w-full md:w-1/2 lg:w-1/3"
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
										to="/product"
										class="bg-jOrange px-4 py-1 rounded-full invisible hover:text-white text-white hover:bg-orange-700"
										style="color: white !impotant"
										@click="handleProductFetch(product.id)"
										>more info</a
									>
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
		</layout>
	</transition>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";

	export default {
		name: "Shop",
		async created() {
			try {
				await this.fetchProducts();
				await this.fetchCategories();
			} catch (error) {
				console.log(error);
			}
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
			...mapActions("products", [
				"fetchProducts",
				"fetchProduct",
				"fetchCategories"
			]),
			...mapActions("cart", ["addToCart"])
		},

		computed: {
			...mapGetters("products", ["products", "categories"])
		}
	};
</script>
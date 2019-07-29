<style lang="scss" scoped>
	.fade-enter-active {
		transition: opacity 0.5s;
	}

	.fade-enter {
		opacity: 0;
	}

	.card {
		@media screen and (max-width: 640px) {
			width: 100%;
			padding-bottom: 60px;
		}
	}
</style>

<template>
	<transition name="fade" appear>
		<Layout>
			<header class="jGrid mx-auto jGrid">
				<h1 class="capitalize my-10 text-center text-3xl">
					choose the design bundle that fits your needs
				</h1>
				<div class="w-1/2 mx-auto text-center text-gray-600">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
					impedit ea quis enim culpa recusandae, tempore quaerat unde, alias
					architecto dolor doloremque illo. Pariatur doloribus tenetur voluptate
				</div>
			</header>
			<section class="flex justify-between flex-wrap mt-20 mb-20 jGrid mx-auto">
				<div
					class="card md:w-1/2 lg:w-1/3 sm:pb-10 px-2 flex flex-col"
					v-for="(card, index) in bundles"
					:key="index * 14"
				>
					<div
						class="px-2 py-6 border border-gray-400 rounded-lg shadow-xl hover:shadow-none custom-transition"
					>
						<header class="flex justify-between items-center mb-10 px-4">
							<div class="text-xs uppercase font-bold">{{ card.type }}</div>
							<div class="text-lg font-bold text-blue-500">
								${{ card.price }}
							</div>
						</header>
						<main class="flex-1">
							<g-image src="~/assets/images/hero.jpg" />
							<div class="my-10 text-center text-gray-500">
								{{ card.description }}
							</div>
						</main>
						<footer class="text-center">
							<button
								class="px-10 py-2 bg-jOrange rounded-full text-white uppercase hover:bg-orange-700 custom-transition focus-none"
								@click="goToShoppingCart"
							>
								get design bundle now
							</button>
						</footer>
					</div>
				</div>
			</section>
		</Layout>
	</transition>
</template>

<script>
	import Bundle from "../helpers/Bundle";
	export default {
		metaInfo: {
			title: "About us"
		},

		data() {
			return {
				plan: null,
				bundles: [new Bundle(), new Bundle(), new Bundle()]
			};
		},

		methods: {
			goToShoppingCart() {
				this.$router.push({ path: "/shopping-cart" });
			}
		}
	};
</script>

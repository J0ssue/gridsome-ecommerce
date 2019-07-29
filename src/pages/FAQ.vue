<style lang="scss" scoped>
	.custom-transition {
		transition: 0.2s ease-in-out;
	}

	#search {
		&:focus {
			outline: none;
			color: white;
			border-bottom-color: white;
		}
	}

	.text-white-trans {
		color: rgba(255, 255, 255, 0.6);
	}

	.card {
		@media screen and (max-width: 640px) {
			width: 100%;
		}
	}
</style>

<template>
	<transition name="fade" appear>
		<Layout>
			<header class="bg-jOrange px-10 py-20 flex items-center justify-between">
				<h1 class="text-5xl font-bold text-white-trans">How can we help?</h1>
				<div class="w-1/2">
					<input
						id="search"
						type="text"
						placeholder="Search"
						class="w-full bg-transparent font-bold border-b-4 border-orange-700 hover:border-white custom-transition cursor-pointer hover:text-white"
					/>
				</div>
			</header>

			<section class="pt-20 jGrid mx-auto">
				<h2 class="text-2xl mb-10 sm:text-center md:text-left">
					Frequently Asked Questions
				</h2>
				<div class="flex flex-wrap justify-between">
					<div
						class="card xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full mb-10 flex sm:justify-center md:justify-start"
						v-for="(card, index) in 9"
						:key="index * 17"
					>
						<div>
							<h3 class="text-xl text-jOrange mb-8">General</h3>
							<ul class="text-gray-700">
								<li class="mb-2">
									<g-link to="/">How to make payment</g-link>
								</li>
								<li class="mb-2">
									<g-link to="/">How to make payment</g-link>
								</li>
								<li class="mb-2">
									<g-link to="/">How to make payment</g-link>
								</li>
							</ul>
							<div class="text-gray-500">
								<g-link to="/">view all questions</g-link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	</transition>
</template>

<script>
	export default {
		metaInfo: {
			title: "About us"
		}
	};
</script>

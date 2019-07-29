<style lang="scss" scoped>
</style>

<template>
	<div class="flex justify-center items-center jGrid mx-auto mt-10">
		<div
			class="text-xs font-bold text-black hover:text-jOrange custom-transition cursor-pointer"
			@click="handlePageQuery('prev')"
		>
			prev
		</div>
		<ul class="flex">
			<li v-for="page in pagination.last_page" :key="page">
				<button
					class="px-2 rounded-full mx-4 text-black focus-none"
					:class="{ 'bg-jOrange': page === pagination.current_page }"
					@click="fetchProducts(page)"
				>
					{{ page }}
				</button>
			</li>
		</ul>
		<div
			class="text-xs font-bold text-black hover:text-jOrange custom-transition cursor-pointer"
			@click="handlePageQuery('next')"
		>
			next
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapMutations } from "vuex";
	import chunk from "lodash.chunk";

	export default {
		name: "Pagination",

		data() {
			return {
				currentSegment: 0
			};
		},

		mounted() {
			let arr = [];
			for (let i = 1; i <= this.pagination.last_page; i++) {
				arr.push(i);
				console.log(chunk(arr, 5));
			}
		},

		methods: {
			handlePageQuery(page) {
				if (page === "next") {
					if (this.pagination.current_page === this.pagination.last_page) {
						return "no more pages to explore";
					} else {
						let next = this.pagination.current_page + 1;
						this.fetchProducts(next);
					}
				} else if (page === "prev") {
					if (this.pagination.current_page === 1) {
						return "no more pages to explore";
					} else {
						let prev = this.pagination.current_page - 1;
						this.fetchProducts(prev);
					}
				}
			},
			...mapActions("products", ["fetchProducts"])
		},

		computed: {
			pages() {
				let arr = [];
				for (let i = 1; i <= this.pagination.last_page; i++) {
					arr.push(i);
				}
				return chunk(arr, 5);
			},

			...mapGetters("products", ["pagination"])
		}
	};
</script>
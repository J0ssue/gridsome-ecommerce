<style lang="scss" scoped>
	@import "../assets/scss/tooltip.scss";
	@import "../assets/scss/juicee_input.scss";

	.items-position {
		top: -16px;
		right: -17px;
	}
	.bottom-right-corner {
		bottom: 40px;
		right: 40px;
	}

	.hover-scale:hover {
		transform: scale(1.2);
	}

	.active--exact {
		color: #ff7455;
	}

	.message {
		&:hover {
			transform: scale(1.1);
		}
	}
</style>

<template>
	<div class="nav container mx-auto text-base">
		<header
			class="capitalize flex justify-between items-center py-8 jGrid mx-auto"
		>
			<strong>
				<g-link to="/" class="focus-none"
					><g-image src="~/assets/images/logo.svg" width="120"
				/></g-link>
			</strong>
			<nav class="nav__right font-bold flex items-center">
				<g-link to="/" class="custom-transition hover:text-jOrange"
					>Home</g-link
				>
				<g-link class="ml-10 custom-transition hover:text-jOrange" to="/prices"
					>pricing</g-link
				>
				<g-link class="ml-10 custom-transition hover:text-jOrange" to="/shop"
					>shop</g-link
				>
				<g-link class="ml-10 custom-transition hover:text-jOrange" to="/faq"
					>FAQ</g-link
				>
				<div class="flex items-center pl-5 ml-5 border-black border-l">
					<div
						class="cursor-pointer relative"
						@click="toggle('isTooltipVisible')"
					>
						{{ activeLan }}
						<ul
							class="tooltip"
							:class="{ 'tooltip-visible': isTooltipVisible }"
						>
							<li v-for="(lan, index) in languages" :key="index * 3">
								<input
									type="text"
									:value="lan"
									readonly
									class="hidden"
									:id="lan.toLowerCase()"
									@click="setLan"
								/>
								<label
									:for="lan.toLowerCase()"
									@click="toggle('isTooltipVisible')"
									>{{ lan }}</label
								>
							</li>
						</ul>
					</div>
					<button
						class="custom-transition px-6 border border-jOrange rounded hover:bg-orange-600 bg-jOrange text-white ml-10 focus-outline-none"
					>
						SIGN IN
					</button>
					<div class="ml-10 hover-scale custom-transition relative">
						<g-link to="/shopping-cart" class="focus-none">
							<g-image
								src="~/assets/images/shopping-cart.png"
								height="25px"
								width="25px"
								class="cursor-pointer"
							/>
							<div
								class="bg-yellow-400 text-black rounded-full w-6 h-6 absolute items-position flex justify-center items-center"
								v-if="cartProducts.length > 0"
							>
								{{ cartProducts.length }}
							</div>
						</g-link>
					</div>
					<div class="ml-10 relative" v-if="showNavSearch">
						<g-image
							src="~/assets/images/search.png"
							height="25px"
							width="25px"
							class="cursor-pointer hover-scale custom-transition"
							@click="toggle('showSearchInput')"
						/>
						<input
							type="text"
							class="absolute border-2 focus-none border-gray-500 p-2 pl-4 j-input rounded-full"
							:class="{ 'j-input-visible': showSearchInput }"
							ref="searchInput"
							@keyup="handleInputKeys"
						/>
						<div
							class="absolute text-xs bg-gray-500 text-white p-1 px-2 close-input-btn hover:bg-gray-600"
							:class="{ 'close-input-btn__show': showSearchInput }"
							@click="toggle('showSearchInput')"
						>
							x
						</div>
					</div>
				</div>
			</nav>
		</header>
		<slot />
		<div
			class="h-20 bg-jOrange w-20 rounded-full fixed bottom-right-corner cursor-pointer text-white flex justify-center items-center border-2 border-white message custom-transition"
			v-if="showMessageButton"
		>
			<g-image src="~/assets/images/message.png" height="25px" width="25px" />
		</div>
	</div>
</template>

<script>
	import { setTimeout } from "timers";
	import { mapGetters, mapActions } from "vuex";

	export default {
		name: "DefaultLayout",
		data() {
			return {
				showSearchInput: false,
				languages: ["EN", "PT"],
				activeLan: "EN" || null,
				isTooltipVisible: false
			};
		},

		methods: {
			toggle(element) {
				if (element === "showSearchInput") {
					this[element] = !this[element];
					this.focusSearch();
				} else {
					this[element] = !this[element];
				}
			},

			// sets language for site
			setLan(event) {
				this.activeLan = event.target.value;
			},

			focusSearch() {
				setTimeout((resolve, reject) => {
					this.$refs.searchInput.focus();
				}, 500);
			},

			handleInputKeys(event) {
				if (event.key === "Escape") {
					this.toggle("showSearchInput");
				}
			}
		},

		computed: {
			showMessageButton() {
				return (
					this.$route.path !== "/shopping-cart" &&
					this.$route.path !== "/checkout"
				);
			},

			showNavSearch() {
				return this.$route.path === "/" || this.$route.path === "/shop";
			},

			...mapGetters("cart", ["cartProducts"])
		}
	};
</script>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>


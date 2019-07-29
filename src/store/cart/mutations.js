export function SET_PRODUCTS(state, items) {
  items === 0 ? state.cartProducts = [] : state.cartProducts = items;
}

export function SET_CART_CONTENT(state, products) {
  products === 0 ? state.content = [] : state.cartProducts = products;
}

export function ADD_PRODUCT(state, product) {
  state.cartProducts.push(product);
}

export function REMOVE_PRODUCT(state, id) {
  state.cartProducts = state.cartProducts.filter(product => product.id !== id);
}

export function REMOVE_PRODUCTS(state) {
  state.cartProducts = [];
}
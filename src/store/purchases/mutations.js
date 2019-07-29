export function SET_PURCHASES(state, items) {
  items === 0 ? state.purchases = [] : state.purchases = items;
}

export function ADD_PURCHASE(state, product) {
  state.purchases.push(product);
}

export function REMOVE_PRODUCT(state, id) {
  state.purchases = state.purchases.filter(product => product.id !== id);
}

export function REMOVE_PRODUCTS(state) {
  state.purchases = [];
}
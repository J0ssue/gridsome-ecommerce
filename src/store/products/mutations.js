export function SET_PRODUCTS(state, products) {
  state.products = products;
}

export function SET_CURRENT_PRODUCT(state, product) {
  state.currentProduct = product;
}

export function SET_MIGHT_ALSO_LIKE(state, products) {
  state.mightAlsoLike = products;
}


export function ADD_PRODUCT(state, product) {
  state.products.unshift(product);
}

export function REMOVE_PRODUCT(state, id) {
  state.products = state.filter(product => product.id !== id);
}

export function REMOVE_PRODUCTS(state) {
  state.products = [];
}

export function REMOVE_CURRENT_PRODUCT(state) {
  state.currentProduct = null;
}

// categories

export function SET_CATEGORIES(state, categories) {
  state.categories = categories;
}

// pagination
export function SET_PAGINATION(state, pagination) {
  state.pagination = pagination;
}
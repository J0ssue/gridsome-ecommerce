import repositories from "~/repositories/RepositoryFactory";
const { RepositoryFactory } = repositories;

export async function fetchCartProducts({ commit }) {
  let { data: { items, products } } = await RepositoryFactory.get('cart-item');
  // let products = items.map(item => {
  //   return { product: item.products, qty: item.qty }
  // });
  let filtered = products.filter(product => items.filter(item => {
    if (item.product_id === product.id) {
      return product.qty = item.qty;
    }
  }));
  commit("SET_PRODUCTS", filtered);
}

export async function addToCart({ dispatch }, product) {
  // add new Item if its not in cart || update quanitty
  // let { data: { item } } = await RepositoryFactory.store('cart-item', product);
  let { data } = await RepositoryFactory.store('cart-item', product);
  // update products in cart
  await dispatch('fetchCartProducts');
  return data;
}

export async function updateCart({ dispatch }, product) {
  // add new Item if its not in cart || update quanitty
  let { data: { item, subtotal } } = await RepositoryFactory.update('cart-item', product);
  // update products in cart
  await dispatch('fetchCartProducts');
  return { subtotal, item };
}

export async function deleteFromCart({ commit, dispatch }, id) {
  // add new Item if its not in cart || update quanitty
  let { data } = await RepositoryFactory.delete('cart-item', id);
  // update products in cart
  await dispatch('fetchCartProducts');
}
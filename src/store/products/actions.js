import repositories from "~/repositories/RepositoryFactory";
const { RepositoryFactory } = repositories;


export async function fetchProducts({ commit, dispatch }, page) {
  // let { data: { products: { data }, mightAlsoLike } } = await RepositoryFactory.get('products');
  let { data } = await RepositoryFactory.get('products', page);
  commit('SET_PAGINATION', data.products);
  commit('SET_MIGHT_ALSO_LIKE', data.mightAlsoLike);
  commit("SET_PRODUCTS", data.products.data);
  return data;
}

export async function fetchProduct({ commit }, id) {
  let { data: { product, mightAlsoLike } } = await RepositoryFactory.show('products', id);
  commit("SET_CURRENT_PRODUCT", product);
  commit("SET_MIGHT_ALSO_LIKE", mightAlsoLike);
}

// categories

export async function fetchCategories({ commit }) {
  let { data: { categories } } = await RepositoryFactory.get('categories');
  commit("SET_CATEGORIES", categories);
}
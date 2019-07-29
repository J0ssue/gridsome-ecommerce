import repositories from "~/repositories/RepositoryFactory";
const { RepositoryFactory } = repositories;

export async function buy({ dispatch }, { token, meta }) {
  let { data } = await RepositoryFactory.store('purchase', { token_id: token, meta });
  await dispatch('cart/fetchCartProducts', null, { root: true });
  return data;
}
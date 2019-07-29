import Repository from './Repository';

class RepositoryFactory {
  constructor(Repository) {
    this.Repository = Repository;
  }

  get(resource, page) {
    if (!!page) {
      return this.Repository.get(resource, {
        params: {
          page
        }
      });
    } else {
      return this.Repository.get(resource);
    }
  }

  show(resource, id) {
    return this.Repository.get(`${resource}/${id}`);
  }

  store(resource, data) {
    return this.Repository.post(resource, data);
  }

  update(resource, data) {
    return this.Repository.put(`${resource}/${data.products_id}`, data);
  }

  delete(resource, id) {
    return this.Repository.delete(`${resource}/${id}`, id);
  }
}

export default {
  RepositoryFactory: new RepositoryFactory(Repository)
};